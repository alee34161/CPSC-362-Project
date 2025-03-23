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
    db.query('CREATE TABLE IF NOT EXISTS userInformation (id INT unsigned AUTO_INCREMENT, username varchar(255), password varchar(255), name varchar(255), PRIMARY KEY (id))', function(err, result) { if (err) throw err; });
    console.log("Created userInformation table");
    db.query('CREATE TABLE IF NOT EXISTS currentUser (username varchar(255), password varchar(255), name varchar(255))', function(err, result) { if (err) throw err; });
	console.log("Created currentUser table");
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
            return res.send('<h1>Invalid Username or Password!</h1>');
        }

        const user = results[0];

        // Check if the entered password matches the stored password
        if (password === user.password) {
        	console.log("Login Successful");
            res.status(200).send('Login Successful');
        } else {
        	console.log("Login Failed");
            res.send('<h1>Invalid Username or Password!</h1>');
        }
    });
});


// Handle the POST request from the registration form
app.post('/register', (req, res) => {
    console.log("Received data:", req.body); // Debugging
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("All fields are required.");
    }

    // Insert into the userInformation table
    db.query(
        'INSERT INTO userInformation (username, password) VALUES (?, ?)',
        [username, password],
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

// Start the server
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
