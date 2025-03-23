const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Middleware to parse URL-encoded data (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',  // use your MySQL password
    database: 'customerDB'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// Serve the login and registration page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/website.html');
});

// Handle the POST request from the login form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database to find the user
    db.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
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
            res.send('<h1>Login Successful!</h1>');
        } else {
            res.send('<h1>Invalid Username or Password!</h1>');
        }
    });
});

// Handle the POST request from the registration form
app.post('/register', (req, res) => {
    console.log("Received data:", req.body); // Debugging
    const { username, password, name } = req.body;

    if (!username || !password || !name) {
        return res.status(400).send("All fields are required.");
    }

    db.query(
        'INSERT INTO Users (Username, Password, Name, Role) VALUES (?, ?, ?, ?)',
        [username, password, name, 'customer'],
        (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).send('Error registering user.');
            }
            res.send('<h1>Registration Successful!</h1>');
        }
    );
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});