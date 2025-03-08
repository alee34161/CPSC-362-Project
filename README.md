# CPSC-362-Project
Cafeteria Ordering Software

Technologies:
React
Node
Next
Express
MySQL C++ Connector
MySQL Server

=========================================

SETUP

=========================================
You must be running on Linux for the following method.

Run these commands:
	sudo apt update		// update lists
	sudo apt install npm	// install node manager
	npm install express		// install expressjs
	npm install next		// install nextjs
	sudo apt install libmysqlcppconn-dev	// install MySQL C++ Connector
	npm install mysql	// install Node drivers for MySQL
	sudo apt install mysql-server	// install mysql
	sudo mysql_secure_installation	// run the installation for mysql
		No to validate passwords	// these options are just optional, but
		No to anonymous user removal// choose these options for consistency
		Yes reload privileges

	After downloading repo and dependencies, go to the frontend directory
	and run the command "npm install" to install the npm libraries.


=========================================

Frontend

=========================================
All code should be made in the src directory.
Tutorials are provided on the default page.


HOW TO RUN FRONTEND:
	On Linux the command is "npm start" in the frontend directory.
	On a browser, use the default web address of localhost:3000

	To test with backend, run npm start and then refer to HOW TO RUN BACKEND section.


=========================================

Backend

=========================================
database/.cpp is compiled with the following command:
	g++ -o nameofexecutable nameoffile.cpp -lmysqlcppconn


HOW TO RUN BACKEND:
	On Linux the command is "node server.js" in the backend directory.
	Note: We still need to implement c++ connections to the js file. Have not done that for now.

	To test with frontend, first refer to HOW TO RUN FRONTEND section above and only after doing so
	run "node server.js" in the backend directory.,.


Developer Notes:
We don't know how to implement the C++ section yet. We can make an index.js for functions if needed.
