var mysql = require('mysql');

var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: ""
});

conn.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL");

	conn.query("CREATE DATABASE IF NOT EXISTS cafeteriaDB", function(err, result) {
		if(err) throw err;
		console.log("cafeteriaDB Database created");
	});
	conn.query("USE cafeteriaDB", function(err, result) {
		if(err) throw err;
		console.log("Using cafeteriaDB Database now");
	});
	var sql = "CREATE TABLE IF NOT EXISTS userinformation (ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,Name varchar(255),Username varchar(255) NOT NULL,Passwords varchar(255) NOT NULL,Role varchar(255))";
	conn.query(sql, function(err, result) {
		if(err) throw err;
		console.log("Authentication Table Created");
	});
});

app.post('/registerUser', (req, res)) => {
	const username = req.body.location;
	console.log("location: " + req.body.location);
}
// not done yet