// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON request bodies

// Database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',  // use your MySQL password
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');

    // Create database if not exists
    db.query('CREATE DATABASE IF NOT EXISTS cafeteriaDB', (err, result) => {
        if (err) throw err; 
    });

    // Use the THE DATABASE
    db.query('USE cafeteriaDB', (err, result) => {
        if (err) throw err; 
    });

    // Create userInformation table
    db.query('CREATE TABLE IF NOT EXISTS userInformation (id INT unsigned AUTO_INCREMENT, username varchar(255), password varchar(255), name varchar(255), role varchar(255), PRIMARY KEY (id))', (err, result) => {
        if (err) throw err; 
    });
    console.log("Created userInformation table");

    // Create currentUser table
    db.query('CREATE TABLE IF NOT EXISTS currentUser (username varchar(255), password varchar(255), name varchar(255), role varchar(255))', (err, result) => {
        if (err) throw err; 
    });
    db.query('DELETE FROM currentUser');
    console.log("Created new currentUser table");

	// Create menus table
	db.query('CREATE TABLE IF NOT EXISTS menus (id INT UNSIGNED AUTO_INCREMENT, name VARCHAR(255), description TEXT, price DECIMAL(10, 2), available BOOLEAN DEFAULT TRUE, PRIMARY KEY (id))', (err, result) => {
		if (err) throw err;
	});
	console.log("Created menus table");

	// Create deliveries table
	db.query('CREATE TABLE IF NOT EXISTS deliveries (id INT UNSIGNED AUTO_INCREMENT, delivery_person_name VARCHAR(255), order_id INT, delivery_status VARCHAR(255), delivery_date DATETIME, PRIMARY KEY (id))', (err, result) => {
	if (err) throw err;
	});
	console.log("Created deliveries table");

	// Create cart table
	db.query('CREATE TABLE IF NOT EXISTS cart (id INT UNSIGNED AUTO_INCREMENT, customer_id INT UNSIGNED, menu_item_id INT UNSIGNED, quantity INT DEFAULT 1, PRIMARY KEY (id), FOREIGN KEY (customer_id) REFERENCES customers(id), FOREIGN KEY (menu_item_id) REFERENCES menus(id))', (err, result) => {
	if (err) throw err;
	});
	console.log("Created cart table");

	// Initialize admin user if not exists
	db.query("INSERT INTO userInformation(role) SELECT ('admin') WHERE NOT EXISTS (SELECT * FROM userInformation)");
	db.query("UPDATE userInformation SET username = 'Root@Root', password = 'admin' WHERE username IS NULL");

});

// ------------------- Routes for User Authentication -------------------

// Handle the POST request for login
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

        // Check if the entered password matches the stored password
        if (password === user.password) {
            console.log("User and password recognized");

            // Respond based on user role
            if (user.role === 'customer') {
                res.status(201).send('Login Successful');
            } else if (user.role === 'cafeteria') {
                res.status(202).send('Cafeteria Employee Login Successful');
            } else if (user.role === 'delivery') {
                res.status(203).send('Delivery Driver Login Successful');
            } else if (user.role === 'admin') {
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

// Handle the POST request for registration
app.post('/register', (req, res) => {
    console.log("Received data:", req.body); // Debugging
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send("All fields are required.");
    }

    // Insert new user into userInformation table
    db.query(
        'INSERT INTO userInformation (username, password, role) VALUES (?, ?, ?)', [username, password, role],
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

// ------------------- Routes for User Management -------------------

// Handle POST request for updating a user's information
app.post('/updateUser', (req, res) => {
    console.log("Received data:", req.body);
    const { username, password, name } = req.body;

    // Update user's password and name in userInformation table
    db.query(
        'UPDATE userInformation SET password = (?), name = (?) WHERE username = (?)', 
        [password, name, username],
        (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(501).send('Error updating user');
            }
            res.status(300).send('Update Successful');
            console.log("User updated successfully");
        }
    );
});

// Handle POST request for deleting a user
app.post('/deleteUser', (req, res) => {
    console.log("Received data:", req.body);
    const { username } = req.body;

    // Delete user from userInformation table
    db.query(
        'DELETE FROM userInformation WHERE username = (?)', [username],
        (err, result) => {
            if (err) {
                console.error('Error deleting user:', err);
                return res.status(501).send('Error deleting user');
            }
            res.status(301).send('Delete Successful');
            console.log("User deleted successfully");
        }
    );
});

// Handle POST request for updating a user's role (admin only)
app.post('/updateAdmin', (req, res) => {
    console.log("Received data:", req.body);
    const { username, role } = req.body;

    // Update user's role in userInformation table
    db.query(
        'UPDATE userInformation SET role = (?) WHERE username = (?)', 
        [role, username],
        (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(501).send('Error updating user');
            }
            res.status(300).send('Update Successful');
            console.log("User updated successfully");
        }
    );
});

// ------------------- Start the Server -------------------

// Start the server to listen on port 8080
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});