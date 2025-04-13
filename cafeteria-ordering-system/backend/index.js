const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
var fs = require('fs');
var restMenu = './RestaurantMenu';
var cafMenu = './CafeteriaMenu';
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// =====================================================
// WARNING:
//	Current implementation can only support one customer
// 	and only tracks customer account information.
//
//	Will need to implement web sockets to handle session
// to session data.
//
// =====================================================


// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // use MySQL password for root, or make the password blank
});

// Connecting to MySQL and initialization commands on startup
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
    db.query("CREATE TABLE IF NOT EXISTS userInformation (id INT unsigned AUTO_INCREMENT, cartTotal decimal (10,2), profileImage MEDIUMTEXT, username varchar(255), password varchar(255), name varchar(255), role varchar(255), phone varchar(255), location varchar(255) DEFAULT 'Fullerton, CA', PRIMARY KEY (id))", function(err, result) { if (err) throw err; });
    console.log("Created userInformation table");
	    
	// Automatically makes an admin account where username is Root@Root and password is admin ONLY IF there is no admin account
	db.query("INSERT INTO userInformation(role) SELECT ('admin') WHERE NOT EXISTS (SELECT * FROM userInformation)");
	db.query("UPDATE userInformation SET username = 'Root@Root', password = 'admin' WHERE username IS NULL");

	// Creates currentUser Table if it isn't already made and empties it completely. Used to track current user for account info
    db.query('CREATE TABLE IF NOT EXISTS currentUser (id INT unsigned, cartTotal decimal (10,2), profileImage MEDIUMTEXT, username varchar(255), password varchar(255), name varchar(255), role varchar(255), phone varchar(255), location varchar(255))', function(err, result) { if (err) throw err; });
	db.query('DELETE FROM currentUser');
	console.log("Created new currentUser table");

	// Creates CafeteriaMenu table. Admin needs to manually add in new items.
    db.query("CREATE TABLE IF NOT EXISTS CafeteriaMenu (id INT unsigned AUTO_INCREMENT, source varchar(255) DEFAULT 'cafeteria', name varchar(255), price decimal(10,2), quantity INT, PRIMARY KEY (id))", function(err, result) { if (err) throw err; });
    db.query("CREATE TABLE IF NOT EXISTS RestaurantMenu (id INT unsigned AUTO_INCREMENT, source varchar(255) DEFAULT 'restaurant', name varchar(255), price decimal(10,2), restaurant varchar(255), PRIMARY KEY (id))", function(err, result) { if (err) throw err; });
	db.query("DELETE FROM RestaurantMenu");

	// Creates default values for Restaurant Menu ONLY IF it is empty
	db.query("SELECT * FROM CafeteriaMenu", (err, results) => {
		if(err) {
			console.error("Failed to check CafeteriaMenu table.");
		}
		if(results.length == 0) {
			fs.readFile(cafMenu, 'utf8', (err, myJSON) => {
				if(err) {
					console.log("Error reading default file cafeteria menu.", err);
				}
				try {
					const cafData = JSON.parse(myJSON);
					cafData.forEach(item => {
						db.query("INSERT INTO CafeteriaMenu (id, name, price, quantity) VALUES (?,?,?,?)", [item.id, item.name, item.price, item.quantity], (err, result) => {
							if(err) {
								console.error('Error inserting cafeteria menu data:', err);
								return;
							}
						})
					})
					console.log('Cafeteria default menu items added successfully');
				} catch (err) {
					console.log('Error parsing CafeteriaMenu file.');
					console.error('Reason:', err);
				}
			});
		}
	});
	
	// Creates default values for Restaurant Menu
	fs.readFile(restMenu, 'utf8', (err, myJSON) => {
		if(err) {
			console.log("Error reading restaurant menu.", err);
		}
	try {
		const restData = JSON.parse(myJSON);
		restData.forEach(item => {
			db.query("INSERT INTO RestaurantMenu (id, name, price, restaurant) VALUES (?,?,?,?)", [item.id, item.name, item.price, item.restaurant], (err, result) => {
				if(err) {
					console.error('Error inserting restaurant menu data:', err);
					return;
				}
			})
		})
		console.log('Restaurant menu items added successfully.');
	} catch (err) {
		console.log('Error parsing RestaurantMenu file.');
		console.error('Reason:', err);
	}
});

	// Implement cart table
	db.query("CREATE TABLE IF NOT EXISTS Cart (id INT unsigned AUTO_INCREMENT, source varchar(255), name varchar(255), price decimal(10,2), quantity INT, customization varchar(255), customerid INT unsigned, foodID INT unsigned, PRIMARY KEY (id), FOREIGN KEY (customerid) REFERENCES userInformation(id))", function(err, result) { if (err) throw err; });
	console.log("Created new Cart table.");
});

	// Implement TempCart table for checkout
	db.query("CREATE TABLE IF NOT EXISTS TempCart (id INT unsigned, source varchar(255), name varchar(255), price decimal(10,2), quantity INT, customization varchar(255), customerid INT unsigned, foodID INT unsigned, orderID INT unsigned, FOREIGN KEY (customerid) REFERENCES userInformation(id), FOREIGN KEY (orderID) REFERENCES Orders(id))", function(err, result) { if (err) throw err; });
	console.log("Created a temp Cart table for checkout purposes.");
	
	// Implement Orders table
	db.query("CREATE TABLE IF NOT EXISTS Orders (id INT unsigned AUTO_INCREMENT, status varchar(255), source varchar(255), customerID INT unsigned, PRIMARY KEY (id), FOREIGN KEY (customerID) REFERENCES userInformation(id))")
	console.log("Created new Orders table.");
	
// ===============================================================
// API request handlers below
// ===============================================================

// Order status read function
app.get('/orderstatus', (req, res) => {
	db.query('SELECT id FROM currentUser', (err, resu) => {
		if(err) {
			console.error('Error reading current user ID');
			return res.status(500).send('Error reading current user ID');
		}
		const customerID = resu[0].id;
		db.query('SELECT status FROM Orders WHERE customerid = ?', [customerID], (err, result) => {
			if(err) {
				console.error('Error reading order status.');
				return res.status(500).send('Error reading order status.');
			}
			return res.send(result);
		});
	});
});

// Order add function. Also sets up the TempCart entries necessary
app.post('/orderadd', (req, res) => {
	const { source } = req.body;
	
	db.query('SELECT id FROM currentUser LIMIT 1', (err, resu) => {
		if (err) {
			console.error('Error reading current user ID.');
			return res.status(500).send('Error reading current user ID.');
		}
		const customerID = resu[0].id;
		db.query(
			'INSERT INTO Orders (source, status, customerID) VALUES (?, ?, ?)',
			[source, 'Pending', customerID],
			(err, result) => {
				if (err) {
					console.error('Error inserting into Orders.');
					return res.status(500).send('Error adding to Orders.');
				}
				const orderID = result.insertId;
				const copyQuery = `
					INSERT INTO TempCart (source, name, price, quantity, customization, customerID, foodID, orderID)
					SELECT source, name, price, quantity, customization, customerid, foodID, ? 
					FROM Cart 
					WHERE customerid = ?
				`;

				db.query(copyQuery, [orderID, customerID], (err, copyResult) => {
					if (err) {
						console.error('Error copying items to TempCart:', err);
						return res.status(500).send('Error creating TempCart for order.');
					}
					console.log('Order added and items copied to TempCart successfully.');
					res.status(200).send('Order placed and cart items stored.');
				});
			}
		);
	});
});

// View all orders
app.get('/orderoverallview', (req, res) => {
	db.query('SELECT * FROM Orders', (err, results) => {
		if(err) {
			console.error('Error reading Orders.');
			res.status(500).send('Error reading Orders.');
		}
		console.log('Overall Orders read successfully.');
		res.send(results);
	})
})

// View specific order
app.get('/orderspecificview', (req, res) => {
	const { orderID } = req.body;
	db.query('SELECT * 
	FROM TempCart 
	WHERE customerid = (SELECT id FROM currentUser LIMIT 1);
	', (err, result) => {
		if(err) {
			console.error('Error reading order items.');
			res.status(500).send('Error reading order items.');
		}
		res.send(result);
	});
});

// Update order status
app.post('/orderstatusupdate', (req, res) => {
	const { orderID, newStatus } = req.body;
	db.query('UPDATE Orders SET status = ? WHERE id = ?', [ newStatus, orderID ],
	(err, result) => {
		if(err) {
			console.error('Error updating order status.');
			res.status(500).send('Error updating order status.');
		}
		console.log('Order status updated successfully.');
		res.status(200).send('Order status updated successfully.');
	})
})

// Update cart total cost for checkout
app.post('/updatetotal', (req, res) => {
	const { cartTotal } = req.body;
	db.query('UPDATE currentUser SET cartTotal = ?', [cartTotal], (err, result) => {
		if(err) {
			console.error('Error updating cart total.');
			return res.status(500).send('Error updating cart total.');
		}
		res.status(200).send('Cart total updated successfully.');
		console.log("currentUser cart total updated successfully.");
	});
});

// Search function for all menus, meant to be used for the dashboard search bar.
app.post('/allmenusearch', (req, res) => {
	const { name } = req.body;
	console.log("received allmenusearch");
	// Query table for any partial matches
	db.query("SELECT * FROM RestaurantMenu WHERE name LIKE ? UNION SELECT * FROM CafeteriaMenu WHERE name LIKE ?", [`%${name}%`,`%${name}%`], (err, results) => {
		if(err) {
			console.error('Error querying all menu.');
			return res.status(500).send('Error querying all menu.');
		}
		res.send(results);
	});
});



// Restaurant menu search function, meant to be used for the menu search bar.
app.post('/restaurantmenusearch', (req, res) => {
	const { name } = req.body;
	console.log("Restaurant Menu Search received with: " + req.body);

	// Query table for any partial matches
	db.query("SELECT * FROM RestaurantMenu WHERE name LIKE '%?%'", [name], (err, results) => {
		if(err) {
			console.error('Error querying restaurant menu.');
			return res.status(500).send('Error querying restaurant menu.');
		}
		res.send(results);
	});
});

// Restaurant menu read function, meant for the customer to be able to see menu items.
app.get('/restaurantmenuread', (req, res) => {
	console.log("Received restaurant Menu read:", req.query);

	db.query("SELECT * FROM RestaurantMenu", (err, result) => {
		if (err) {
			console.error('Error reading RestaurantMenu:', err);
			return res.status(500).send('Error reading RestaurantMenu.');
		}
		return res.json(result);
		})
});
	
// Restaurant menu update function, meant for admin to update menu items in case local restaurant is out of stock
app.post('/restaurantmenuupdate', (req, res) => {
	const { id, name, quantity } = req.body;
	console.log("Restaurant Menu Update received with: " + req.body);

	db.query('UPDATE RestaurantMenu SET quantity = (?) WHERE id = (?)', [quantity, id], (err, results) => {
		if(err) {
			console.error('Error updating restaurant menu.');
			return res.status(500).send('Error querying restaurant menu.');
		}
		res.status(200).send('Restaurant Menu updated successfully.');
	});
});

// Cart Create function, meant for customers to add to the cart
app.post('/cartadd', (req, res) => {
	const { id, name, price, quantity, source } = req.body;
	console.log("Cart add received with:", req.body);
	db.query('SELECT id FROM currentUser', (err, result) => {
		if(err) {
			console.error('Error reading current customer id:', err);
		}
		const customerID = result[0].id
		db.query(
				'INSERT INTO Cart (source, name, price, quantity, customerid, foodID) VALUES (?, ?, ?, ?, ?, ?)', 
				[source, name, price, quantity, customerID, id], 
				(err, results) => {
					if (err) {
					console.error('Error adding item to cart:', err);
					return res.status(500).send('Error adding item to cart.');
				}
				res.status(200).send('Item added to cart successfully.');
				console.log('Item added to cart successfully.');
				}
			);
	})

});

// Cart Read function, meant for the customer to be able to see current cart.
// Will need adjustment based on frontend.
app.get('/cartread', (req, res) => {
	console.log("Received cart read:", req.query);
	// Only read items that are above 0 quantity

	db.query('SELECT id FROM currentUser', (err, result) => {
		if(err) {
			console.error('Error reading current customer id:', err);
		}
		const customerID = result[0].id
		
		db.query("SELECT * FROM Cart WHERE quantity > 0 AND customerID = ?", [customerID], (err, result) => {
				if (err) {
					console.error('Error reading cart:', err);
					return res.status(500).send('Error reading cart.');
				}
				console.log("Cart read successfully.");
				return res.json(result);
			});
	})
	
});

// Cart Total function, meant for checkout purposes
// Will need adjustment based on frontend
app.get('/carttotal', (req, res) => {
	console.log("Received cart total:", req.query);
	db.query("SELECT Cart.quantity*Cart.price as TOTAL FROM Cart WHERE quantity > 0", (err, result) => {
		if(err) {
			console.error('Error totaling cart:', err);
			return res.status(500).send('Error totaling cart.');
		}
		console.log("Cart totaled successfully.");
		return res.json(result);
	});
});

// Cart Update function, meant for customer to be able to update cart items.
// Will need adjustment based on frontend.
app.post('/cartupdate', (req, res) => {
	console.log("Received cart update:", req.body);
	const { id, quantity } = req.body;
	db.query('UPDATE Cart SET quantity = (?) WHERE id = (?)', [quantity, id], (err, results) => {
		if(err) {
			console.error('Error updating cart.');
			return res.status(500).send('Error updating cart.');
		}
		res.status(200).send('Cart updated successfully.');
		console.log('Cart updated successfully.');
	});
});

// Cart customization update function
app.post('/cartcustomupdate', (req, res) => {
	console.log("Received customization field update:", req.body);
	const { id, customization } = req.body;
	db.query('UPDATE Cart SET customization = (?) WHERE id = (?)', [customization, id], (err, results) => {
		if(err) {
			console.error('Error updating cart.');
			return res.status(500).send('Error updating cart.');
		}
		res.status(200).send('Cart updated successfully.');
		console.log('Cart updated successfully.');
	});
});

// Cart Delete function. Might be unnecessary?
app.post('/cartdelete', (req, res) => {
	console.log("Received cart delete:", req.body);
	const { id, source } = req.body;
	db.query('DELETE FROM Cart WHERE id = (?) AND source = (?)', [id, source], (err, results) => {
		if(err) {
			console.error('Error deleting from cart.');
			return res.status(500).send('Error deleting from cart.');
		}
		res.status(200).send('Cart item deleted successfully');
		console.log('Cart item deleted successfully.');
	});
});


// Cafeteria menu add function, meant for admin to add new items
app.post('/cafmenuadd', (req, res) => {
	const { name, price, quantity } = req.body;
	console.log("Cafeteria Menu Add received with: " + name + " " + price + " " + quantity);
	db.query('INSERT INTO CafeteriaMenu (name, price, quantity) VALUES (?,?,?)', [name, price, quantity], (err, results) => {
		if (err) {
			console.error('Error adding cafeteria menu item.');
			return res.status(500).send('Error adding cafeteria menu item.');
		}
		res.status(200).send('Cafeteria Menu Item added successfully.');
		console.log('Cafeteria Menu Item added successfully.');
	});
});

// Cafeteria menu search function, meant to be used for the menu search bar at the dashboard.
app.post('/cafmenusearch', (req, res) => {
	const { name } = req.body;
	console.log("Cafeteria Menu Search received with: " + req.body);

	// Query table for any partial matches
	db.query("SELECT * FROM CafeteriaMenu WHERE name LIKE '%?%'", [name], (err, results) => {
		if(err) {
			console.error('Error querying cafeteria menu.');
			return res.status(500).send('Error querying cafeteria menu.');
		}
		res.send(results);
	});
});

// Cafeteria menu read function, meant for the customer to be able to see menu items.
app.get('/cafmenuread', (req, res) => {
	console.log("Received Cafeteria Menu read:", req.query);

	db.query("SELECT * FROM CafeteriaMenu", (err, result) => {
		if (err) {
			console.error('Error reading cafeteria menu:', err);
			return res.status(500).send('Error reading cafeteria menu.');
		}
		return res.json(result);
	});
});
	
// Cafeteria menu update function, meant for admin to update menu items
app.post('/cafmenuupdate', (req, res) => {
	const { id, name, quantity } = req.body;
	console.log("Cafeteria Menu Update received with: " + req.body);

	db.query('UPDATE CafeteriaMenu SET quantity = (?) WHERE id = (?)', [quantity, id], (err, results) => {
		if(err) {
			console.error('Error updating cafeteria menu.');
			return res.status(500).send('Error querying cafeteria menu.');
		}
		res.status(200).send('Cafeteria Menu updated successfully.');
	});
});

// Cafeteria menu delete function, meant for the admin to delete items
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

// Login function, meant for the user to be able to log into system and be sent to a page based on role
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

        	// Set currentUser if customer
        	if('customer' === user.role) {
        		db.query("INSERT INTO currentUser SELECT * FROM userInformation WHERE id = (?)", [user.id], (err, resu) => {
        			if(err) {
        				console.error('Error setting current user:', err);
        				return res.status(500).send('Error setting current user.');
        			}
        		});
        		console.log("Set current User.");
        	};
			
        	// Send to correct landing page sorted by status
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

// Current user read function, meant for the account info page to display the current user's information
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

// Current user profile pic update function
app.post('/currentuserpicupdate', (req, res) => {
	console.log("Received current user profile pic update:", req.body);
	const { profileImage } = req.body;

	db.query('UPDATE currentUser SET profileImage = ?', [profileImage], (err, result) => {
		if(err) {
			console.error("Error updating pic:", err);
			return res.status(500).send('Error updating pic.');
		}
		console.log("current user pic updated successfully");
	});
	db.query('UPDATE userInformation SET profileImage = ?', [profileImage], (err, result) => {
		if(err) {
			console.error("Error updating pic in database:", err);
			return res.status(500).send('Error updating pic in database.');
		}
		console.log("use pic updated in database successfully");
	});
});


// Current user update function, meant for the edit profile page
app.post('/currentuserupdate', (req, res) => {
  console.log("Received current user update:", req.body);
  const { username, password, name, phone } = req.body;


    // Gets the user id from currentUser table for updating. The table should only have one entry
  db.query("SELECT id FROM currentUser", (err, result) => {
    if (err) {
      console.error('Error fetching user ID:', err);
      return res.status(500).send('Error fetching user ID.');
    }

    if (result.length === 0) {
      console.log('No current user found: did you log in correctly?');
      return res.status(404).send('No user found with the given username');
    }

    const id = result[0].id;

    
    // Check for duplicate usernames
	// currently not working.
    
    /*db.query('SELECT * FROM userInformation WHERE username = (?)', [username], (err, checkResult) => {
    	if(err) {
    		console.error('Error registering user:', err);
    		return rest.status(500).send('Error registering user.');
    	}
    	if(checkResult.length > 0 && checkResult[0].id != id) {
    		console.log("Registering user denied. Email already in use.");
    		return res.status(500).send('Email already in use.');
    	} 
    });*/


    // Update the currentUser table using the id as an identifier
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

      // Update the userInformation table using the same id so that the account changes are saved in the database, not just Account Info page
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



// Register new user function, meant for users to be able to make an account
app.post('/register', (req, res) => {
    console.log("Received data:", req.body); // Debugging
    const { username, password, role } = req.body;
    const profileImage = 'https:media.tenor.com/2abbiMqSkOwAAAAM/charlotte-healing-song.gif'

    if (!username || !password || !role) {
        return res.status(400).send("All fields are required.");
    }
    // First check for duplicate usernames
    db.query('SELECT * FROM userInformation WHERE username = (?)', [username], (err, result) => {
    	if(err) {
    		console.error('Error registering user:', err);
    		return res.status(500).send('Error registering user.');
    	}
    	if(result.length > 0) {
    		console.log("Registering user denied. Email already in use.");
    		return res.status(500).send('Email already in use.');
    	} else {
    	db.query(
        'INSERT INTO userInformation (username, password, role, profileImage) VALUES (?, ?, ?, ?)',
        [username, password, role, profileImage],
        (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).send('Error registering user.');
            }
            res.status(200).send('Registration Successful!');
            console.log("User registered successfully:", username);
        }
    );
    	}
    });


});


// Update user function, meant for the admin to update user information as needed, whether resetting passwords or whatnot
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

// Update admin function, meant for the current admin to promote/demote other users to and from admin role
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

// Delete user function, meant to allow the admin to delete any users.
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


// Start the server using port 8080
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
