const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
var fs = require('fs');
var restMenu = './RestaurantMenu';
var cafMenu = './CafeteriaMenu';
const app = express();
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());


const sessionStore = new MySQLStore({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'cafeteriaDB'
});

app.use(session({
	key: 'cafeteria_session',
	secret: 'dsnafu32',
	store: sessionStore,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000*60*60*24,
		httpOnly: true
	}
}));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // use MySQL password for root, or make the password blank
});

// Connecting to MySQL and initialization commands on startup
const dbInit = (callback) => {
		db.connect((err) => {
		    if (err) {
		        console.error('Error connecting to MySQL:', err);
		        return callback(err);
		    }
		    console.log('Connected to MySQL!');
		
			// Creates the main cafeteria ordering system database if it isnt already made and use it
		    db.query('CREATE DATABASE IF NOT EXISTS cafeteriaDB');
		    db.query('USE cafeteriaDB');
		
			// Creates the user information table if it isn't already made for authentication and account info.
			// Note: username is the same thing as email
		    db.query("CREATE TABLE IF NOT EXISTS userInformation (id INT unsigned AUTO_INCREMENT, subscribed BOOL Default 0, pointDiscount BOOL DEFAULT 0, loyaltyPoints INT DEFAULT 0, currentOrderID INT unsigned, cartTotal decimal (10,2), profileImage MEDIUMTEXT, username varchar(255), password varchar(255), name varchar(255), role varchar(255), phone varchar(255), location varchar(255) DEFAULT 'Fullerton, CA', PRIMARY KEY (id))");
		    console.log("Created userInformation table");
			    
			// Automatically makes an admin account where username is root@employee and password is admin ONLY IF there is no admin account
			db.query("INSERT INTO userInformation (username, password, role) SELECT 'root@employee', 'admin', 'admin' WHERE NOT EXISTS (SELECT 1 FROM userInformation WHERE role = 'admin') LIMIT 1;");
			// Automatically makes cafeteria employee/delivery driver accounts for testing purposes.
			// cafeteria@employee and delivery@employee
			// password for both is 'test'
			// same for customer with customer@employee
			db.query("INSERT INTO userInformation (username, password, role) SELECT 'customer@employee', 'test', 'customer' WHERE NOT EXISTS (SELECT 1 FROM userInformation WHERE role = 'customer') LIMIT 1;");
			db.query("INSERT INTO userInformation (username, password, role) SELECT 'cafeteria@employee', 'test', 'cafeteria' WHERE NOT EXISTS (SELECT 1 FROM userInformation WHERE role = 'cafeteria') LIMIT 1;");
			db.query("INSERT INTO userInformation (username, password, role) SELECT 'delivery@employee', 'test', 'delivery' WHERE NOT EXISTS (SELECT 1 FROM userInformation WHERE role = 'delivery') LIMIT 1;");
		
			// Creates CafeteriaMenu table. Admin needs to manually add in new items.
		    db.query("CREATE TABLE IF NOT EXISTS CafeteriaMenu (id INT unsigned AUTO_INCREMENT, source varchar(255) DEFAULT 'cafeteria', name varchar(255), price decimal(10,2), quantity INT, category varchar(255), image MEDIUMTEXT, PRIMARY KEY (id))");
			console.log("Created CafeteriaMenu");
		    db.query("CREATE TABLE IF NOT EXISTS RestaurantMenu (id INT unsigned AUTO_INCREMENT, source varchar(255) DEFAULT 'restaurant', name varchar(255), price decimal(10,2), restaurant varchar(255), category varchar(255), image MEDIUMTEXT, PRIMARY KEY (id))");
			console.log("Created RestaurantMenu");
		
			db.query("SELECT * FROM CafeteriaMenu", (err, results) => {
				if(err) {
					console.error("Failed to check CafeteriaMenu table.");
					return callback(err);
				}
				if(results.length == 0) {
					fs.readFile(cafMenu, 'utf8', (err, myJSON) => {
					    if (err) {
					        console.log("Error reading cafeteria menu JSON file:", err);
					        return callback(err);
					    }
					    try {
					        const cafData = JSON.parse(myJSON);
					        cafData.forEach(item => {
					            db.query(
					                `INSERT INTO CafeteriaMenu (id, source, name, price, quantity, category, image)
					                 VALUES (?, ?, ?, ?, ?, ?, ?)
					                 ON DUPLICATE KEY UPDATE
					                 source = VALUES(source),
					                 name = VALUES(name),
					                 price = VALUES(price),
					                 quantity = VALUES(quantity),
					                 category = VALUES(category),
					                 image = VALUES(image)`,
					                [item.id, 'cafeteria', item.name, item.price, item.quantity, item.category, item.image],
					                (err, result) => {
					                    if (err) {
					                        console.error('Error inserting/updating cafeteria menu data:', err);
					                        return callback(err);
					                    }
					                }
					            );
					        });
					        console.log('Cafeteria menu items added/updated successfully.');
					    } catch (err) {
					        console.log('Error parsing CafeteriaMenu JSON file.');
					        console.error('Reason:', err);
					    }
					});
				}
			})	
			
			// Creates default values for Restaurant Menu
		fs.readFile(restMenu, 'utf8', (err, myJSON) => {
		    if (err) {
		        console.log("Error reading restaurant menu.", err);
		        return callback(err);
		    }
		    try {
		        const restData = JSON.parse(myJSON);
		
		        // Loop through each item in the JSON file
		        restData.forEach(item => {
		            // Upsert logic: Insert or update the row based on the `id`
		            db.query(
		                `INSERT INTO RestaurantMenu (id, source, name, price, restaurant, category, image)
		                 VALUES (?, ?, ?, ?, ?, ?, ?)
		                 ON DUPLICATE KEY UPDATE
		                 source = VALUES(source),
		                 name = VALUES(name),
		                 price = VALUES(price),
		                 restaurant = VALUES(restaurant),
		                 category = VALUES(category),
		                 image = VALUES(image)`,
		                [item.id, 'restaurant', item.name, item.price, item.restaurant, item.category, item.image],
		                (err, result) => {
		                    if (err) {
		                        console.error('Error inserting/updating restaurant menu data:', err);
		                        return callback(err);
		                    }
		                }
		            );
		        });
		
		        console.log('Restaurant menu items added/updated successfully.');
		    } catch (err) {
		        console.log('Error parsing RestaurantMenu file.');
		        console.error('Reason:', err);
		    }
		});
		
			// Implement cart table
			db.query("CREATE TABLE IF NOT EXISTS Cart (id INT unsigned AUTO_INCREMENT, source varchar(255), name varchar(255), price decimal(10,2), quantity INT, customization varchar(255), customerid INT unsigned, foodID INT unsigned, PRIMARY KEY (id), FOREIGN KEY (customerid) REFERENCES userInformation(id))")
			console.log("Created new Cart table.");
		
			// Implement Orders table
			db.query("CREATE TABLE IF NOT EXISTS Orders (id INT unsigned AUTO_INCREMENT, total decimal(10,2) Default 0.00, pointsEarned INT unsigned, deliveryAddress varchar(255), status varchar(255), customerID INT unsigned, PRIMARY KEY (id), FOREIGN KEY (customerID) REFERENCES userInformation(id))");
			console.log("Created new Orders table.");
			
			// Implement History table for checkout
			db.query("CREATE TABLE IF NOT EXISTS History (id INT unsigned, source varchar(255), name varchar(255), price decimal(10,2), quantity INT, customization varchar(255), customerid INT unsigned, foodID INT unsigned, orderID INT unsigned, FOREIGN KEY (customerid) REFERENCES userInformation(id), FOREIGN KEY (orderID) REFERENCES Orders(id))")
			console.log("Created a History table for checkout purposes.");

			console.log("Database finished initialization.");
			return callback(null);
		});
}



	
// ===============================================================
// API request handlers below
// ===============================================================

// Order status read function
app.get('/orderstatus', (req, res) => {
	const customerID = req.session.user.id;
	const orderID = req.session.user.currentOrderID;
	db.query('SELECT status FROM Orders WHERE customerid = ? AND id = ?', [customerID, orderID], (err, result) => {
		if(err) {
			console.error('Error reading order status.');
			return res.status(500).send('Error reading order status.');
		}
		console.log("Order status read successfully.");
		return res.send(result);
	});
});

// Order add function. Also sets up the History entries necessary
app.post('/orderadd', (req, res) => {
    const { delivery } = req.body;
    console.log("Order add request received");

    const userData = req.session.user;
    console.log('USER DATA TOTAL: ' + userData.cartTotal.toFixed(2));

    db.query('SELECT * FROM CafeteriaMenu', (err, cafmenures) => {
        if (err) {
            console.error('Error reading cafeteria menu:', err);
            return res.status(500).send('Error reading cafeteria menu.');
        }
        const cafData = cafmenures;

        db.query('SELECT foodID, quantity FROM Cart WHERE customerID = ? AND source = ?', [userData.id, 'cafeteria'], (err, foodCheck) => {
            if (err) {
                console.error('Error reading cafeteria cart items:', err);
                return res.status(500).send('Error reading cafeteria cart items.');
            }

            let insufficient = false;
            for (let i = 0; i < foodCheck.length; i++) {
                for (let j = 0; j < cafData.length; j++) {
                    if (foodCheck[i].foodID === cafData[j].id) {
                        if (foodCheck[i].quantity > cafData[j].quantity) {
                            insufficient = true;
                            break;
                        }
                    }
                }
                if (insufficient) break;
            }

            if (insufficient) {
                return res.status(400).send('Not enough items in cafeteria inventory.');
            }
			console.log('Done checking caf inventory.');
            let inventoryUpdateCount = 0;
            if(foodCheck.length === 0) {
	           	const daPoints = (userData.cartTotal.toFixed(2) / 10).toFixed(0);
					console.log('daPoints: ' + daPoints);
					db.query('INSERT INTO Orders (deliveryAddress, status, customerID, pointsEarned, total) VALUES (?, ?, ?, ?, ?)', [delivery, 'Pending', userData.id, daPoints, userData.cartTotal.toFixed(2)], (err, orderResult) => {
						if (err) {
							console.error('Error inserting into Orders:', err);
							return res.status(500).send('Error inserting into Orders.');
						}
            	
						console.log('Done making new Orders entry');
						const orderID = orderResult.insertId;
						req.session.user.currentOrderID = orderID;
            	
						db.query('INSERT INTO History (id, source, name, price, quantity, customization, customerID, foodID, orderID) ' +
						'SELECT id, source, name, price, quantity, customization, customerID, foodID, ? ' +
						'FROM Cart WHERE customerID = ?', [orderID, userData.id], (err) => {
							if (err) {
								console.error('Error adding to History:', err);
								return res.status(500).send('Error adding to History.');
							}
            	
							db.query('DELETE FROM Cart WHERE customerID = ?', [userData.id], (err) => {
							if (err) {
								console.error('Error deleting from Cart:', err);
								return res.status(500).send('Error deleting from Cart.');
							}
            	
							console.log('Order placed successfully.');
							
							db.query('UPDATE userInformation SET loyaltyPoints = loyaltyPoints + ?, pointDiscount = 0 WHERE id = ?', [daPoints, userData.id], (err) => {
								if(err) {
									console.error('Error updating loyaltyPoints in userInformation:', err);
									return res.status(500).send('Error updating loyaltyPoints.');
								}
								return res.status(200).send('Order placed and cart items stored.');
							})
						});
					});
				});
			}
            foodCheck.forEach((item) => {
                db.query('UPDATE CafeteriaMenu SET quantity = quantity - ? WHERE id = ?', [item.quantity, item.foodID], (err) => {
                    if (err) {
                        console.error('Error updating inventory:', err);
                        return res.status(500).send('Error updating inventory.');
                    }

                    inventoryUpdateCount++;
                    if (inventoryUpdateCount === foodCheck.length) {
                        console.log('Done updating caf inventory');
                        const daPoints = userData.cartTotal.toFixed(2) / 10
                        console.log('daPoints: ' + daPoints);
                        db.query('INSERT INTO Orders (deliveryAddress, status, customerID, pointsEarned, total) VALUES (?, ?, ?, ?, ?)', [delivery, 'Pending', userData.id, daPoints, userData.cartTotal.toFixed(2)], (err, orderResult) => {
                            if (err) {
                                console.error('Error inserting into Orders:', err);
                                return res.status(500).send('Error inserting into Orders.');
                            }

							console.log('Done making new Orders entry');
                            const orderID = orderResult.insertId;
                            req.session.user.currentOrderID = orderID;

                            db.query('INSERT INTO History (id, source, name, price, quantity, customization, customerID, foodID, orderID) ' +
                                'SELECT id, source, name, price, quantity, customization, customerID, foodID, ? ' +
                                'FROM Cart WHERE customerID = ?', [orderID, userData.id], (err) => {
                                    if (err) {
                                        console.error('Error adding to History:', err);
                                        return res.status(500).send('Error adding to History.');
                                    }

                                    db.query('DELETE FROM Cart WHERE customerID = ?', [userData.id], (err) => {
                                        if (err) {
                                            console.error('Error deleting from Cart:', err);
                                            return res.status(500).send('Error deleting from Cart.');
                                        }

                                        console.log('Order placed successfully.');
                                        db.query('UPDATE userInformation SET loyaltyPoints = loyaltyPoints + ?, pointDiscount = 0 WHERE id = ?', [daPoints, userData.id], (err) => {
                                        	if(err) {
                                        		console.error('Error updating userInformation: ', err);
                                        		return res.status(500).send('Error updating userInformation.');
                                        	}
                                        	res.status(200).send('Order placed and cart items stored.');
                                        })
                                    });
                                });
                        });
                    }
                });
            });
        });
    });
});




// View customer's orders
app.get('/ordercustomerview', (req, res) => {
	const customerID = req.session.user.id;
	db.query('SELECT * FROM Orders WHERE customerID = ?', [customerID], (err, results) => {
		if(err) {
			console.error('Error reading Orders.');
			res.status(500).send('Error reading Orders.');
		}
		console.log('Customer orders read successfully.');
		res.send(results);
	})
})

app.get('/orderview', (req, res) => {
	const {orderID} = req.query;
	console.log('Received orderview call.');
	db.query('SELECT * FROM Orders WHERE id = ?', [orderID], (err, result) => {
		if(err) {
			console.error('Error reading from Orders.');
			return res.status(500).send('Error reading from Orders.');
		}
		return res.send(result[0]);
	})
})

// View only cafeteria items associated with order
app.get('/ordercafitemslist', (req, res) => {
  const { ordID } = req.query;
  db.query('SELECT * FROM History WHERE orderID = ? AND source = ?', [ordID, 'cafeteria'], (err, results) => {
    if (err) {
      console.error('Error reading History:', err);
      return res.status(500).send('Error reading from History');
    }
    res.send(results);
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

// View all undelivered orders
app.get('/orderoverallviewnotdelivered', (req, res) => {
	db.query('SELECT * FROM Orders WHERE status != ?', ['Delivered'], (err, results) => {
		if(err) {
			console.error('Error reading Orders.');
			res.status(500).send('Error reading Orders.');
		}
		console.log('Overall Orders not delivered read successfully.');
		res.send(results);
	})
})

// View specific order
app.get('/orderspecificview', (req, res) => {
	const { orderID } = req.query;
	db.query('SELECT * FROM History WHERE customerid = ? AND orderID = ?', [req.session.user.id, orderID, orderID], (err, result) => {
		if(err) {
			console.error('Error reading order items.');
			res.status(500).send('Error reading order items.');
		}
		res.send(result);
	});
});

// Read for tracking page
app.get('/currentorderread', (req, res) => {
	console.log("Received current order read:", req.query);

	const orderID = req.session.user.currentOrderID;
			
	db.query("SELECT * FROM History WHERE quantity > 0 AND orderID = ?", [orderID], (err, result) => {
		if (err) {
			console.error('Error reading History:', err);
			return res.status(500).send('Error reading History.');
		}
		console.log("Current order items read successfully.");
		return res.json(result);
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
	db.query('UPDATE userInformation SET cartTotal = ? WHERE id = ?', [cartTotal, req.session.user.id], (err, result) => {
		if(err) {
			console.error('Error updating cart total.');
			return res.status(500).send('Error updating cart total.');
		}
		req.session.user.cartTotal = cartTotal;
		console.log("userInformation cart total updated successfully.");
		res.status(200).send('Cart total updated successfully.');
	});
});

// Search function for all menus, meant to be used for the dashboard search bar.
app.post('/allmenusearch', (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).send('Search term is required.');
    }

    console.log("received allmenusearch with:", name);

    db.query(
        `SELECT id, name, price, 'restaurant' AS source FROM RestaurantMenu WHERE name LIKE ? 
         UNION 
         SELECT id, name, price, 'cafeteria' AS source FROM CafeteriaMenu WHERE name LIKE ? AND quantity > 0`,
        [`%${name}%`, `%${name}%`],
        (err, results) => {
            if (err) {
                console.error('Error querying all menu:', err);
                return res.status(500).send('Error querying all menu.');
            }
            console.log("Query results:", results);
            res.send(results);
        }
    );
});



// Restaurant menu search function, meant to be used for the menu search bar.
app.post('/restaurantmenusearch', (req, res) => {
	const { name } = req.body;
	console.log("Restaurant Menu Search received with: " + req.body);

	// Query table for any partial matches
	db.query("SELECT * FROM RestaurantMenu WHERE name LIKE ?", [`%${name}%`], (err, results) => {
		if(err) {
			console.error('Error querying restaurant menu.');
			return res.status(500).send('Error querying restaurant menu.');
		}
		res.send(results);
	});
});

// Restaurant menu read function, meant for the customer to be able to see menu items.
app.get('/restaurantmenuread', (req, res) => {
    const query = 'SELECT * FROM RestaurantMenu';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching menu data:', err);
            res.status(500).send('Error fetching menu data');
        } else {
            res.json(results);
        }
    });
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
	const customerID = req.session.user.id
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
});

// Cart Read function, meant for the customer to be able to see current cart.
// Will need adjustment based on frontend.
app.get('/cartread', (req, res) => {
	console.log("Received cart read:", req.query);
	// Only read items that are above 0 quantity
	if (!req.session.user || !req.session.user.id) {
		return res.status(401).send('Unauthorized: User not logged in');
	}
	const customerID = req.session.user.id
		
	db.query("SELECT * FROM Cart WHERE quantity > 0 AND customerID = ?", [customerID], (err, result) => {
		if (err) {
			console.error('Error reading cart:', err);
			return res.status(500).send('Error reading cart.');
		}
		console.log("Cart read successfully.");
		return res.json(result);
	});
});

// Cart Total function, meant for checkout purposes
// Will need adjustment based on frontend
app.get('/carttotal', (req, res) => {
	console.log("Received cart total:", req.query);
	db.query("SELECT Cart.quantity*Cart.price as TOTAL FROM Cart WHERE quantity > 0 WHERE customerID = ?", [req.session.user.id], (err, result) => {
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

// Cart Delete function.
app.post('/cartdelete', (req, res) => {
	console.log("Received cart delete:", req.body);
	const { id, source } = req.body;
	db.query('DELETE FROM Cart WHERE foodID = (?) AND source = (?) WHERE customerID = ?', [id, source, req.session.user.id], (err, results) => {
		if(err) {
			console.error('Error deleting from cart.');
			return res.status(500).send('Error deleting from cart.');
		}
		res.status(200).send('Cart item deleted successfully');
		console.log('Cart item deleted successfully.');
	});
});

// Delete a specific cart item.
app.post('/cartitemdelete', (req, res) => {
	console.log("Received specific cart delete:", req.body);
	const { id } = req.body;
	db.query('DELETE FROM Cart WHERE id = ?', [id], (err, result) => {
		if(err) {
			console.error('Error deleting specific item from cart.');
			return res.status(500).send('Error deleting specific item from cart.');
		}
		console.log('Cart item deleted successfully.');
		res.status(200).send('Cart item deleted successfully.');
	})
})


// Cafeteria menu add function, meant for admin to add new items
app.post('/cafmenuadd', (req, res) => {
	const { name, price, quantity, category, image } = req.body;
	if(image != null) {
	} else {
		image = 'no image detected';
	}
	console.log("Cafeteria Menu Add received with: " + name + " " + price + " " + quantity);
	db.query('INSERT INTO CafeteriaMenu (name, price, quantity, category, image) VALUES (?,?,?,?,?)', [name, price, quantity, category, image], (err, results) => {
		if (err) {
			console.error('Error adding cafeteria menu item.', err);
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
	db.query("SELECT * FROM CafeteriaMenu WHERE name LIKE ?", [`%${name}%`], (err, results) => {
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

	db.query("SELECT * FROM CafeteriaMenu WHERE quantity > 0", (err, result) => {
        if (err) {
            console.error('Error reading cafeteria menu:', err);
            return res.status(500).send('Error reading cafeteria menu.');
        }
		return res.json(result);
	});
});
	
// Cafeteria menu update function, meant for admin to update menu items
app.post('/cafmenuupdate', (req, res) => {
  const { name, price, quantity, category, image } = req.body;
  console.log('cafmenuupdate received.');

  if (!name) {
    return res.status(400).send('Missing required field: name');
  }

  const fields = [];
  const values = [];

  if (price != null) {
    fields.push('price = ?');
    values.push(price);
  }

  if (quantity != null) {
    fields.push('quantity = ?');
    values.push(quantity);
  }
  if (category != null) {
    fields.push('category = ?');
    values.push(category);
  }
  if (image != null) {
    fields.push('image = ?');
    values.push(image);
  }

  if (fields.length === 0) {
    return res.status(400).send('No fields to update.');
  }

  const sql = `UPDATE CafeteriaMenu SET ${fields.join(', ')} WHERE name = ?`;
  values.push(name); // for the WHERE clause
	console.log('TEST for cafmenuupdate: ' + fields.join(', '));
	console.log('TEST for cafmenuupdate: ' + values);
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error updating cafeteria menu:', err);
      return res.status(500).send('Error querying cafeteria menu.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Menu item not found.');
    }

    res.status(200).send('Cafeteria menu updated successfully.');
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
            return res.status(400).send('Invalid Username!');
        }

        const user = results[0];

        // Check if the entered password matches the stored password and send to correct page according to role
        if (password === user.password) {
        	console.log("user and password recognized");

        	req.session.user = {username: username, id: user.id, currentOrderID: user.currentOrderID, cartTotal: user.cartTotal, name: user.name, phone: user.phone};
			
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
				res.status(401).send('Invalid Role. Log in as default admin');
			}
        } else {
        	console.log("Login Failed");
            res.status(400).send('Invalid Password!');
        }
    });
});

// Logout option
app.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error('Logout error:', err);
			return res.status(500).send('Error logging out');
		}
		res.clearCookie('cafeteria_session');
		return res.status(200).send('Logged out successfully');
	});
});

app.post('/discount', (req, res) => {
	console.log('Received discount call.');
	db.query('SELECT * FROM userInformation WHERE id = ?', [req.session.user.id], (err, userResult) => {
		if(err) {
			console.error('Error reading user information.');
			return res.status(400).send('Error reading user information.');
		}
		if(userResult[0].pointDiscount === 1) {
			return res.status(255).send('Already discounted.');
		}
		db.query('UPDATE userInformation SET loyaltyPoints = loyaltyPoints - 50, pointDiscount = 1 WHERE id = ?', [req.session.user.id], (err, result) => {
			if(err) {
				console.error('Error updating points/discount:', err);
				return res.status(500).send('Error updating points/discount.');
			}
			return res.status(200).send('Discount applied successfully.');
		})
	})
})

app.post('/subscribe', (req, res) => {
	console.log('Received subscribe call.');
	const userID = req.session.user.id;
	console.log('Received the user ID');
	db.query('SELECT * FROM userInformation WHERE id = ?', [userID], (err, result) => {
		if(err) {
			console.error('Error reading userInformation subscribed field.');
			return res.status(404).send('Error reading subscribed from userInformation.');
		}
		const subscribed = result[0].subscribed;
		if(subscribed == 0) {
			db.query('UPDATE userInformation SET subscribed = 1 WHERE id = ?', [userID], (err, finres) => {
				if(err) {
					console.error('Error updating userInformation.');
					return res.status(404).send('Error updating userInformation.');
				}
				return res.status(201).send('subscribed updated successfully.');
			})
		} else {
			db.query('UPDATE userInformation SET subscribed = 0 WHERE id = ?', [userID], (err, finres) => {
				if(err) {
					console.error('Error updating userInformation.');
					return res.status(404).send('Error updating userInformation.');
				}
				return res.status(202).send('subscribed updated successfully.');
			})
		}
	})
})


// Current user read function, meant for the account info page to display the current user's information
app.get('/currentuserread', (req, res) => {
	console.log("Received current user read:", req.query);

	db.query("SELECT * FROM userInformation WHERE id = ?", [req.session.user.id], (err, result) => {
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

// All customers read function, meant for delivery drivers to be able to identify ids with names
app.get('/customers', (req, res) => {
	db.query('SELECT * FROM userInformation WHERE role = ?', ['customer'], (err, results) => {
		if(err) {
			console.error('Error reading userInformation:', err);
			return res.status(500).send('Error reading userInformation.');
		}
		return res.json(results);
	})
})

// Current user profile pic update function
app.post('/currentuserpicupdate', (req, res) => {
	console.log("Received current user profile pic update:", req.body);
	const { profileImage } = req.body;

	db.query('UPDATE userInformation SET profileImage = ? WHERE id = ?', [profileImage, req.session.user.id], (err, result) => {
		if(err) {
			console.error("Error updating pic:", err);
			return res.status(500).send('Error updating pic.');
		}
		console.log("current user pic updated successfully");
		return res.status(200).send('Current user pic updated successfully');
	});
});


// Current user update function, meant for the edit profile page
app.post('/currentuserupdate', (req, res) => {
  console.log("Received current user update:", req.body);
  const { username, password, name, phone } = req.body;

	req.session.user.name = name;
	req.session.user.phone = phone;
	req.session.user.username = username;
    const id = req.session.user.id;

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



// Register new user function, meant for users to be able to make an account
app.post('/register', (req, res) => {
	console.log("Received data:", req.body);
	const { username, password, role } = req.body;
	const profileImage = 'https:media.tenor.com/2abbiMqSkOwAAAAM/charlotte-healing-song.gif'

	if (!username || !password || !role) {
		return res.status(400).send("All fields are required.");
	}
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
		});
		}
	});
});


// Update user function, meant for the admin to update user information as needed, whether resetting passwords or whatnot
app.post('/updateUser', (req, res) => {
	console.log("Received update user data:", req.body);
	const { username, password, name } = req.body;
	const fields = [];
	const values = [];
	if (password != null && password != '') {
		fields.push('password = ?');
		values.push(password);
	}
	if(name != null && name != '') {
		fields.push('name = ?');
		values.push(name);
	}
	values.push(username);

	db.query(
		`UPDATE userInformation SET ${fields.join(', ')} WHERE username = ?`, values,
		(err, result) => {
			if(err) {
				console.error('Error updating user:', err);
				return res.status(501).send('Error updating user');
			}
			res.status(200).send('Update Successful');
			console.log("User updated successfully");
		}
	)
});

// Update admin function, meant for the current admin to promote/demote other users to and from admin role
app.post('/updateRole', (req, res) => {
	console.log("Received update role data:", req.body);
	const { username, role } = req.body;

	db.query(
		'UPDATE userInformation SET role = (?) WHERE username = (?)', [role, username],
		(err, result) => {
			if(err) {
				console.error('Error updating user:', err);
				return res.status(501).send('Error updating user');
			}
			res.status(200).send('Update Successful');
			console.log("User updated successfully");
		}
	)
});

// Delete user function, meant to allow the admin to delete any users.
app.post('/deleteUser', (req, res) => {
	console.log("Received delete user data:", req.body);
	const { username } = req.body;

	db.query(
		'DELETE FROM userInformation WHERE username = (?)', [username],
		(err, result) => {
			if(err) {
				console.error('Error deleting user:', err);
				return res.status(501).send('Error deleting user');
			}
			res.status(201).send('Delete Successful');
			console.log("User deleted successfully");
		}
	)
});

module.exports = { app, db, dbInit, sessionStore, };
