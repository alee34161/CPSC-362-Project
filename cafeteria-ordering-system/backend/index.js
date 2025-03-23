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

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
    db.query('CREATE DATABASE IF NOT EXISTS cafeteriaDB', function(err, result) { if (err) throw err; });
    db.query('USE cafeteriaDB', function(err, result) { if (err) throw err; });
    db.query('CREATE TABLE IF NOT EXISTS userInformation (id INT unsigned AUTO_INCREMENT, username varchar(255), password varchar(255), name varchar(255), role varchar(255), PRIMARY KEY (id))', function(err, result) { if (err) throw err; });
    console.log("Created userInformation table");
	db.query("INSERT INTO userInformation(role) SELECT ('admin') WHERE NOT EXISTS (SELECT * FROM userInformation)");
	db.query("UPDATE userInformation SET username = 'Root@Root', password = 'admin' WHERE username IS NULL");
    
    db.query('CREATE TABLE IF NOT EXISTS currentUser (username varchar(255), password varchar(255), name varchar(255), role varchar(255))', function(err, result) { if (err) throw err; });
	db.query('DELETE FROM currentUser');
	console.log("Created new currentUser table");
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

        // Check if the entered password matches the stored password
        if (password === user.password) {
        	console.log("user and password recognized");
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


// Start the server
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
