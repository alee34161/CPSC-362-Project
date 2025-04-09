const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',  // use MySQL password for root, or make the password blank
});

db.connect((err) => {
    if (err) return console.error('Error connecting to MySQL:', err);
    console.log('Connected to MySQL!');
    db.query('CREATE DATABASE IF NOT EXISTS cafeteriaDB', (err) => { if (err) throw err; console.log('Database cafeteriaDB is ready.'); });
    db.query('USE cafeteriaDB', (err) => { if (err) throw err; });
	
	// The Tables are created if they do not exist
    db.query(`CREATE TABLE IF NOT EXISTS currentUser (id INT UNSIGNED, username VARCHAR(255), password VARCHAR(255), name VARCHAR(255), role VARCHAR(255), phone VARCHAR(255), location VARCHAR(255));`, (err) => { if (err) throw err; db.query('DELETE FROM currentUser'); console.log("Created new currentUser table"); });
    db.query(`CREATE TABLE IF NOT EXISTS CafeteriaMenu (id INT UNSIGNED AUTO_INCREMENT, name VARCHAR(255), price VARCHAR(255), quantity INT, PRIMARY KEY (id));`, (err) => { if (err) throw err; console.log("Created CafeteriaMenu table"); });
    db.query(`CREATE TABLE IF NOT EXISTS RestaurantMenu (id INT UNSIGNED AUTO_INCREMENT, restaurant_name VARCHAR(255), name VARCHAR(255), price VARCHAR(255), quantity INT, PRIMARY KEY (id));`, (err) => { if (err) throw err; console.log("Created RestaurantMenu table"); });
    db.query(`CREATE TABLE IF NOT EXISTS Cart (id INT UNSIGNED, name VARCHAR(255), price VARCHAR(255), quantity INT);`, (err) => { if (err) throw err; db.query('DELETE FROM Cart'); console.log("Created new Cart table."); });
	db.query(`CREATE TABLE IF NOT EXISTS userInformation (id INT UNSIGNED AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), name VARCHAR(255), role VARCHAR(255), phone VARCHAR(255), location VARCHAR(255) DEFAULT 'Fullerton, CA', PRIMARY KEY (id));`, (err) => { if (err) throw err; console.log("Created userInformation table"); });
	db.query(`CREATE TABLE IF NOT EXISTS Orders (order_id INT UNSIGNED AUTO_INCREMENT, user_id INT UNSIGNED, order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, total_amount DECIMAL(10, 2) NOT NULL, order_status VARCHAR(50) DEFAULT 'pending', payment_status VARCHAR(50) DEFAULT 'pending', PRIMARY KEY (order_id), FOREIGN KEY (user_id) REFERENCES userInformation(id));`, (err) => { if (err) throw err; console.log("Created Orders table"); });
	db.query(`CREATE TABLE IF NOT EXISTS OrderItems (item_id INT UNSIGNED AUTO_INCREMENT, order_id INT UNSIGNED, menu_type ENUM('cafeteria', 'restaurant'), menu_item_id INT UNSIGNED, quantity INT NOT NULL, price_at_purchase DECIMAL(10, 2) NOT NULL, PRIMARY KEY (item_id), FOREIGN KEY (order_id) REFERENCES Orders(order_id));`, (err) => { if (err) throw err; console.log("Created OrderItems table"); });
	db.query(`CREATE TABLE IF NOT EXISTS PaymentTransactions (transaction_id INT UNSIGNED AUTO_INCREMENT, user_id INT UNSIGNED, order_id INT UNSIGNED, amount DECIMAL(10, 2) NOT NULL, payment_method VARCHAR(255) NOT NULL, transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, status VARCHAR(50) DEFAULT 'pending', PRIMARY KEY (transaction_id), FOREIGN KEY (user_id) REFERENCES userInformation(id), FOREIGN KEY (order_id) REFERENCES Orders(order_id));`, (err) => { if (err) throw err; console.log("Created PaymentTransactions table"); });
	
	db.query(`INSERT INTO userInformation(role) SELECT ('admin') WHERE NOT EXISTS (SELECT * FROM userInformation);`);
    db.query(`INSERT INTO userInformation (username, password, role) SELECT 'Root@Root', 'admin', 'admin' WHERE NOT EXISTS (SELECT 1 FROM userInformation WHERE role = 'admin');`);
    db.query(`INSERT INTO userInformation (username, password, role) SELECT 'cafeteria@example.com', 'cafepass', 'cafeteria' WHERE NOT EXISTS (SELECT 1 FROM userInformation WHERE role = 'cafeteria');`);
    db.query(`UPDATE userInformation SET username = 'cafeteria@example.com', password = 'cafepass' WHERE role = 'cafeteria' AND username IS NULL;`);
});

// =====================================================
// Restaurant Menu
// =====================================================

app.post('/resmenuadd', (req, res) => {
	const { name, price, quantity } = req.body;
	console.log("Restaurant Menu Add received with: " + name + " " + price + " " + quantity);
	db.query('INSERT INTO Restaurant (name, price, quantity) VALUES (?,?,?)', [name, price, quantity], (err, results) => {
		if (err) {
			console.error('Error adding restaurant menu item.');
			return res.status(500).send('Error adding restaurant menu item.');
		}
		res.status(200).send('Restaurant Menu Item added successfully.');
		console.log('Restaurant Menu Item added successfully.');
	});
});

// Restaurant menu search function, meant to be used for the menu search bar at the dashboard.
app.post('/resmenusearch', (req, res) => {
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
app.get('/resmenuread', (req, res) => {
	console.log("Received Restaurant Menu read:", req.query);

	db.query("SELECT * FROM RestaurantMenu", (err, result) => {
		if (err) {
			console.error('Error reading current user:', err);
			return res.status(500).send('Error reading current user.');
		}

		if (result.length > 0) {
			// Log the username (assuming the result is an array of user records)
			console.log("Restaurant Menu read successfully:", result[0].name);
			return res.json(result[0]);  // Send the first user record as a response
		} else {
			console.log('No current user found.');
			return res.status(404).send('No current user found.');
		}
	});
});
	
// Restaurant menu update function, meant for admin to update menu items
app.post('/resmenuupdate', (req, res) => {
	const { id, name, quantity } = req.body;
	console.log("Restaurant Menu Update received with: " + req.body);

	db.query('UPDATE RestaurantMenu SET quantity = (?) WHERE id = (?)', [quantity, id], (err, results) => {
		if(err) {
			console.error('Error updating cafeteria menu.');
			return res.status(500).send('Error querying cafeteria menu.');
		}
		res.status(200).send('Cafeteria Menu updated successfully.');
	});
});

// Restaurant menu delete function, meant for the admin to delete items
app.post('/resmenudelete', (req, res) => {
	const { id, name } = req.body;
	console.log("Restaurant Menu Delete received with: " + req.body);
	db.query('DELETE FROM RestaurantMenu WHERE name = (?) OR id = (?)', [name, id], (err, results) => {
		if(err) {
			console.error('Error deleting restaurant menu item.');
			return res.status(500).send('Error deleting restaurant menu item.');
		}
		res.status(200).send('Restaurant Menu Item deleted successfully.');
	});
});

// =====================================================
// Cafeteria Menu
// =====================================================

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
			console.error('Error reading current user:', err);
			return res.status(500).send('Error reading current user.');
		}

		if (result.length > 0) {
			// Log the username (assuming the result is an array of user records)
			console.log("Cafeteria Menu read successfully:", result[0].name);
			return res.json(result[0]);  // Send the first user record as a response
		} else {
			console.log('No current user found.');
			return res.status(404).send('No current user found.');
		}
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

// =====================================================
// Cart
// =====================================================

app.post('/cartadd', (req, res) => {
	const { id, name, price, quantity } = req.body;
	console.log("Cart add received with:" + name);
	// Note to future self: may need to first query on the item based on id in the Menus, and then
	// send in relevant data. quantity in the menu table and quantity from the customer are NOT the same.
	db.query('INSERT INTO Cart (id, name, price, quantity) VALUES (?,?,?)', [id, name, price, quantity], (err, results) => {
		if(err) {
			console.error('Error adding item to cart.');
			return res.status(500).send('Error adding item to cart.');
		}
		res.status(200).send('Item added to cart successfully.');
		console.log('Item added to cart successfully.');
	});
});

// Cart Read function, meant for the customer to be able to see current cart.
// Will need adjustment based on frontend.
app.get('/cartread', (req, res) => {
	console.log("Received cart read:", req.query);
	// Only read items that are above 0 quantity
	db.query("SELECT * FROM Cart WHERE quantity > 0", (err, result) => {
		if (err) {
			console.error('Error reading cart:', err);
			return res.status(500).send('Error reading cart.');
		}
		console.log("Cart read successfully.");
		return res.json(result);
	});
});

// Cart Update function, meant for customer to be able to update cart items.
// Will need adjustment based on frontend.
app.post('/cartupdate', (req, res) => {
	console.log("Received cart update:", req.body);
	const { id, quantity } = req.body;
	db.query('UPDATE Cart SET name = (?), quantity = (?) WHERE id = (?)', [name, quantity, id], (err, results) => {
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
	const { id } = req.body;
	db.query('DELETE FROM Cart WHERE id = (?)', [id], (err, results) => {
		if(err) {
			console.error('Error deleting from cart.');
			return res.status(500).send('Error deleting from cart.');
		}
		res.status(200).send('Cart item deleted successfully');
		console.log('Cart item deleted successfully.');
	});
});

// =====================================================
// Order System (Testing)
// =====================================================

app.post('/placeorder', (req, res) => {
    console.log("Received order request:", req.body);
    const { userId, cartItems } = req.body;

    // Calculate the total amount for the order (you can customize this calculation)
    let totalAmount = 0;
    cartItems.forEach(item => {
        totalAmount += parseFloat(item.price) * item.quantity; // Assuming cartItems contain 'price' and 'quantity'
    });

    // Insert order into Orders table with pending status
    db.query('INSERT INTO Orders (user_id, total_amount, order_status) VALUES (?, ?, "pending")', [userId, totalAmount], (err, result) => {
        if (err) {
            console.error('Error placing order:', err);
            return res.status(500).send('Error placing order');
        }

        const orderId = result.insertId; // Get the newly inserted order ID

        // Log the order items in Cart (we assume that cartItems contains the correct details to insert into an order table)
        cartItems.forEach(item => {
            db.query('INSERT INTO OrderItems (order_id, meal_id, quantity, price) VALUES (?, ?, ?, ?)', 
                [orderId, item.id, item.quantity, item.price], (err) => {
                    if (err) {
                        console.error('Error inserting order items:', err);
                        return res.status(500).send('Error inserting order items');
                    }
                });
        });

        // Clear the cart after the order is placed
        db.query('DELETE FROM Cart WHERE user_id = ?', [userId], (err) => {
            if (err) {
                console.error('Error clearing cart:', err);
                return res.status(500).send('Error clearing cart');
            }
            console.log('Cart cleared successfully after order');
        });

        // Respond with success
        res.status(200).send(`Order placed successfully with ID ${orderId}`);
        console.log('Order placed successfully with ID:', orderId);
    });
});

// Process Payment function, used when a customer makes a payment.
app.post('/processpayment', (req, res) => {
    console.log("Received payment request:", req.body);
    const { orderId, paymentDetails, userId } = req.body;

    // Assuming payment is successful and payment method is provided in the request
    const paymentStatus = 'completed'; // This can be based on the payment gateway response
    const amount = parseFloat(paymentDetails.amount); // Ensure amount is provided correctly

    // Update the payment status in the Orders table
    db.query('UPDATE Orders SET payment_status = ? WHERE order_id = ?', [paymentStatus, orderId], (err, result) => {
        if (err) {
            console.error('Error processing payment:', err);
            return res.status(500).send('Error processing payment');
        }

        // Log the transaction in the Transaction table
        db.query('INSERT INTO Transaction (user_id, order_id, amount, payment_method, payment_status) VALUES (?, ?, ?, ?, ?)', 
            [userId, orderId, amount, paymentDetails.method, paymentStatus], (err, result) => {
                if (err) {
                    console.error('Error logging transaction:', err);
                    return res.status(500).send('Error logging transaction');
                }

                // Respond with success
                res.status(200).send('Payment processed and transaction logged successfully');
                console.log('Payment processed and transaction logged successfully');
            });
    });
});

// Update Order Status function, used to change the status of an order (e.g., to "completed" or "canceled").
app.post('/updateorderstatus', (req, res) => {
    console.log("Received order status update:", req.body);
    const { orderId, newStatus } = req.body;

    // Update the order status in the Orders table
    db.query('UPDATE Orders SET order_status = ? WHERE order_id = ?', [newStatus, orderId], (err, result) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).send('Error updating order status');
        }

        // Respond with success
        res.status(200).send(`Order status updated to ${newStatus}`);
        console.log('Order status updated to', newStatus);
    });
});


// =====================================================
// User Information
// =====================================================

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
