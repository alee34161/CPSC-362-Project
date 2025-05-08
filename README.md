# CPSC-362-Project
# Cafeteria Ordering Software

Technologies:\
React\
Node\
Next\
Express\
Axios\
MySQL Server\
CORs


## SETUP


You must be running on Linux for the following method.

Run these commands:\
	sudo apt update          // update lists\
	sudo apt install npm     // install node manager\
	npm install              // install react/node dependencies\
	sudo apt install mysql-server      // install mysql




 
Note: You will need to either set the root password in the index.js backend code,\
	  or set the mysql root password to blank/NULL. To do this run these commands in separate order:\
   sudo mysql\
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';\
   exit



## Frontend


All code should be made in the src directory.\
Tutorials are provided on the default page.


### HOW TO RUN FRONTEND:

	On Linux the command is "npm run build" and then "npm run start" in the frontend directory.
	On a browser, use the default web address of localhost:3000
\
	**To test with backend, refer to HOW TO RUN BACKEND section below.**


## Backend


Main code is in the index.js file.


### HOW TO RUN BACKEND:

	On Linux the command is "node server.js" in the backend directory.
\
	**To test with frontend, refer to HOW TO RUN FRONTEND section above.**


## SRS Documentation
[SRS Google Doc](https://docs.google.com/document/d/1vHGxRGFeUjudUNqFsrj9UzxUwihta8cknSypmEp9GxA/edit?usp=sharing)
