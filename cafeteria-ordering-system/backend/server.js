const { app, dbInit } = require('./index');

// Start the server using port 8080
dbInit((err) => {
	if(err) {
		console.error('DB initialization failed:', err);
		process.exit(1);
	}

	app.listen(8080, () => {
		console.log('Server running on http://localhost:8080');
	})
})
