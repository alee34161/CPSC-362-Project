const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Setting up the MySQL connection with relevant information needed

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',				// MySQL user. May need to change depending on current user.
	password: '',				// Password for above ^
});

// Connecting to MySQL

db.connect((err) => {
	if(err){
		console.error('Error connecting to MySQL:', err);
	} else {
		console.log('Connected to MySQL database');
	}
});

app.listen(port, () => {
	console.log('Server running on http://localhost:${port}');
});
