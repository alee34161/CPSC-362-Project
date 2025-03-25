const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import CORS library
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json()); // This helps to parse JSON from incoming requests

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // use your MySQL password
});

// Connecting to MySQL and initialization commands
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');

	// Creates the main cafeteria ordering system database if it isnt already made and use it
    db.query('CREATE DATABASE IF NOT EXISTS cafeteriaDB', function(err, result) { if (err) throw err; });
    db.query('USE cafeteriaDB', function(err, result) { if (err) throw err; });

	// Creates the user information table if it isn't already made for authentication and account info.
	// Note: username is the same thing as email
    db.query("CREATE TABLE IF NOT EXISTS userInformation (id INT unsigned AUTO_INCREMENT, username varchar(255), password varchar(255), name varchar(255), role varchar(255), phone varchar(255), location varchar(255) DEFAULT 'Fullerton, CA', PRIMARY KEY (id))", function(err, result) { if (err) throw err; });
    console.log("Created userInformation table");
	// Automatically makes an admin account where username is Root@Root and password is admin IF there is no admin account
	db.query("INSERT INTO userInformation(role) SELECT ('admin') WHERE NOT EXISTS (SELECT * FROM userInformation)");
	db.query("UPDATE userInformation SET username = 'Root@Root', password = 'admin' WHERE username IS NULL");

	// Creates currentUser Table if it isn't already made and empties it completely. Used to track user for account info
    db.query('CREATE TABLE IF NOT EXISTS currentUser (id INT unsigned, username varchar(255), password varchar(255), name varchar(255), role varchar(255), phone varchar(255), location varchar(255))', function(err, result) { if (err) throw err; });
	db.query('DELETE FROM currentUser');
	console.log("Created new currentUser table");

    db.query('CREATE TABLE IF NOT EXISTS CafeteriaMenu (id INT unsigned AUTO_INCREMENT, name varchar(255), price varchar(255), quantity INT, PRIMARY KEY (id))', function(err, result) { if (err) throw err; });
});


// Handle the POST request from the cafeteria menu add form, meant for admin to add new items
app.post('/cafmenuadd', (req, res) => {
	const { name, price, quantity } = req.body;
	console.log("Cafeteria Menu Add received with: " + name + " " + price + " " + quantity);

	// Add item to cafeteria menu table
	db.query('INSERT INTO CafeteriaMenu (name, price, quantity) VALUES (?,?,?)', [name, price, quantity], (err, results) => {
		if (err) {
			console.error('Error adding cafeteria menu item.');
			return res.status(500).send('Error adding cafeteria menu item.');
		}
		res.status(200).send('Cafeteria Menu Item added successfully.');
		console.log('Cafeteria Menu Item added successfully.');
	});
});

// Handle the POST request from the cafmenuread form, meant to be used for the menu search bar.
app.post('/cafmenuread', (req, res) => {
	const { name } = req.body;
	console.log("Cafeteria Menu Read received with: " + req.body);

	// Query table for any partial matches
	db.query("SELECT * FROM CafeteriaMenu WHERE name LIKE '%?%'", [name], (err, results) => {
		if(err) {
			console.error('Error querying cafeteria menu.');
			return res.status(500).send('Error querying cafeteria menu.');
		}
		res.send(results);
	});
});
	
// Handle the POST request from the cafmenuupdate form, meant for admin to update menu
app.post('/cafmenuupdate', (req, res) => {
	const { id, name, quantity } = req.body;
	console.log("Cafeteria Menu Update received with: " + req.body);

	db.query('UPDATE CafeteriaMenu SET quantity = (?) WHERE name = (?)', [quantity, name], (err, results) => {
		if(err) {
			console.error('Error updating cafeteria menu.');
			return res.status(500).send('Error querying cafeteria menu.');
		}
		res.status(200).send('Cafeteria Menu updated successfully.');
	});
});

// Handle the POST request from the cafmenudelete form, meant for the admin to delete items
app.post('/cafmenudelete', (req, res) => {
	const { id, name } = req.body;
	console.log("Cafeteria Menu Delete received with: " + req.body);

	db.query('DELETE FROM CafeteriaMenu WHERE name = (?) OR id = (?)', [name, id], (err, results) => {
		if(err) {
			console.error('Error deleting cafeteria menu item.');
			return res.status(500).send('Error deleting cafeteria menu item.');
		}
		res.status(200).send('Cafeteria Menu Item deleted successfully.');
	});
});

// Handle the POST request from the login form
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Login request received with: " + req.body);

    // Query the database to find the user
    db.query('SELECT * FROM userInformation WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user.');
        }

        if (results.length === 0) {
            return res.status(400).send('Invalid Username or Password!');
        }

        const user = results[0];

        // Check if the entered password matches the stored password and send to correct page according to role
        if (password === user.password) {
        	console.log("user and password recognized");

        	// Set currentUser
			db.query("INSERT INTO currentUser SELECT * FROM userInformation WHERE id = (?)", [user.id], (err, resu) => {
				if(err) {
					console.error('Error setting current user:', err);
					return res.status(500).send('Error setting current user.');
				}
			});
			console.log("Set current User.");
        	
			if(user.role === 'customer') {
				res.status(201).send('Login Successful');
			} else if(user.role === 'cafeteria') {
				res.status(202).send('Cafeteria Employee Login Successful');
			} else if(user.role === 'delivery') {
				res.status(203).send('Delivery Driver Login Successful');
			} else if(user.role === 'admin') {
				res.status(204).send('Menu Administrator Login Successful');
			} else {
				res.status(401).send('Invalid Role. Log in as default admin, user: Root@Root pass: admin');
			}
        } else {
        	console.log("Login Failed");
            res.send('<h1>Invalid Username or Password!</h1>');
        }
    });
});

app.get('/currentuserread', (req, res) => {
	console.log("Received current user read:", req.query);

	db.query("SELECT * FROM currentUser", (err, result) => {
		if (err) {
			console.error('Error reading current user:', err);
			return res.status(500).send('Error reading current user.');
		}

		if (result.length > 0) {
			// Log the username (assuming the result is an array of user records)
			console.log("Current User read successfully:", result[0].username);
			return res.json(result[0]);  // Send the first user record as a response
		} else {
			console.log('No current user found.');
			return res.status(404).send('No current user found.');
		}
	});
});


app.post('/currentuserupdate', (req, res) => {
  console.log("Received current user update:", req.body);
  const { username, password, name, phone } = req.body;

  // Step 1: Get the user id by username
  db.query("SELECT id FROM currentUser", (err, result) => {
    if (err) {
      console.error('Error fetching user ID:', err);
      return res.status(500).send('Error fetching user ID.');
    }

    if (result.length === 0) {
      console.log('No current user found: did you log in correctly?');
      return res.status(404).send('No user found with the given username');
    }

    const id = result[0].id; // Get the user id from the result

    // Step 2: Update the currentUser table using the id
    db.query("UPDATE currentUser SET username = ?, password = ?, name = ?, phone = ? WHERE id = ?", [username, password, name, phone, id], (err, result) => {
      if (err) {
        console.error('Error updating current user:', err);
        return res.status(500).send('Error updating current user.');
      }

      if (result.affectedRows === 0) {
        console.log('No user updated with the given ID');
        return res.status(404).send('No user updated with the given ID');
      }

      console.log("Current User updated successfully.");

      // Step 3: Update the userInformation table using the same id
      db.query("UPDATE userInformation SET username = ?, password = ?, name = ?, phone = ? WHERE id = ?", [username, password, name, phone, id], (err, result) => {
        if (err) {
          console.error('Error updating user information:', err);
          return res.status(500).send('Error updating user information.');
        }

        if (result.affectedRows === 0) {
          console.log('No matching user information entry found.');
          return res.status(404).send('No matching user information entry found.');
        }

        console.log("userInformation updated successfully.");
        res.status(200).send('Update Successful');
      });
    });
  });
});



// Handle the POST request from the registration form
app.post('/register', (req, res) => {
    console.log("Received data:", req.body); // Debugging
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send("All fields are required.");
    }

    // Insert into the userInformation table
    db.query(
        'INSERT INTO userInformation (username, password, role) VALUES (?, ?, ?)',
        [username, password, role],
        (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).send('Error registering user.');
            }
            res.status(200).send('Registration Successful!');
            console.log("User registered successfully:", username);
        }
    );
});


// Handle the POST request from the updateUser form, meant for account info page.
app.post('/updateUser', (req, res) => {
	console.log("Received data:", req.body);
	const { username, password, name } = req.body;

	db.query(
		'UPDATE userInformation SET password = (?), name = (?) WHERE username = (?)', [password, name, username],
		(err, result) => {
			if(err) {
				console.error('Error updating user:', err);
				return res.status(501).send('Error updating user');
			}
			res.status(300).send('Update Successful');
			console.log("User updated successfully");
		}
	)
});

// Handle the POST request from the updateAdmin form, meant to allow the admin to update any roles based on username/email.
app.post('/updateAdmin', (req, res) => {
	console.log("Received data:", req.body);
	const { username, role } = req.body;

	db.query(
		'UPDATE userInformation SET role = (?) WHERE username = (?)', [role, username],
		(err, result) => {
			if(err) {
				console.error('Error updating user:', err);
				return res.status(501).send('Error updating user');
			}
			res.status(300).send('Update Successful');
			console.log("User updated successfully");
		}
	)
});

// Handle the POST request from the deleteUser form, meant to allow the admin to delete any users.
app.post('/deleteUser', (req, res) => {
	console.log("Received data:", req.body);
	const { username } = req.body;

	db.query(
		'DELETE FROM userInformation WHERE username = (?)', [username],
		(err, result) => {
			if(err) {
				console.error('Error deleting user:', err);
				return res.status(501).send('Error deleting user');
			}
			res.status(301).send('Delete Successful');
			console.log("User deleted successfully");
		}
	)
});


// Start the server using the listen function on port 8080
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
