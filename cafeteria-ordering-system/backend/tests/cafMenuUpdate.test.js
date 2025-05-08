const request = require('supertest');
const { app, db, dbInit, sessionStore } = require('../index');

beforeAll((done) => {
	dbInit((err) => {
		if(err) return done(err);
		db.query('DELETE FROM CafeteriaMenu WHERE name = ?', ['Test Item'], (err) => {
			if(err) return done(err);
			db.query('INSERT INTO CafeteriaMenu (name, price, quantity, category, image) VALUES (?,?,?,?,?)', ['Test Item', 42.99, 100, 'Breakfast', 'image.jpg'], (err2) => {
				if(err2) return done(err2);
				done();
			});
		})
	})
})

beforeEach((done) => {
	db.query('DELETE FROM CafeteriaMenu WHERE name = ?', ['Test Item'], (err) => {
		if (err) return done(err);
		db.query('INSERT INTO CafeteriaMenu (name, price, quantity, category, image) VALUES (?, ?, ?, ?, ?)', ['Test Item', 42.99, 100, 'Breakfast', 'image.jpg'], (err2) => {
			if (err2) return done(err2);
			done();
		});
	});
});

afterEach((done) => {
	db.query('DELETE FROM CafeteriaMenu WHERE name = ?', ['Test Item'], (err) => {
		if (err) return done(err);
		done();
	});
});


afterAll((done) => {
	sessionStore.close(()=> {
		db.end((err => {
			if(err) return done(err);
			done();
		}))
	})
})

describe("Test cafMenuUpdate()", () => {
	// Quantity
	test("Checks for expected new quantity of 200", async () => {
		const response = await request(app).post('/cafmenuupdate').send({
			name: 'Test Item',
			quantity: 200
		});

		db.query('SELECT * FROM CafeteriaMenu WHERE name = ?', ['Test Item'], (err, resu) => {
			if(err) console.error('Error checking price of Test Item:', err);
			expect(err).toBe(null);
			expect(resu.length).toBe(1);
			const item = resu[0];
			expect(item.name).toBe('Test Item');
			expect(item.price).toBe('42.99');
			expect(item.quantity).toBe(200);
			expect(item.category).toBe('Breakfast');
			expect(item.image).toBe('image.jpg');
		})
	})

	// Price
	test("Checks for expected new price of 2.99", async () => {
		const response = await request(app).post('/cafmenuupdate').send({
			name: 'Test Item',
			price: 2.99
		});

		db.query('SELECT * FROM CafeteriaMenu WHERE name = ?', ['Test Item'], (err, resu) => {
			if(err) console.error('Error checking price of Test Item:', err);
			expect(err).toBe(null);
			expect(resu.length).toBe(1);
			const item = resu[0];
			expect(item.name).toBe('Test Item');
			expect(item.price).toBe('2.99');
			expect(item.quantity).toBe(100);
			expect(item.category).toBe('Breakfast');
			expect(item.image).toBe('image.jpg');
		})
	})

	// category
	test("Checks for expected new category of Lunch", async () => {
		const response = await request(app).post('/cafmenuupdate').send({
			name: 'Test Item',
			category: 'Lunch'
		});

		db.query('SELECT * FROM CafeteriaMenu WHERE name = ?', ['Test Item'], (err, resu) => {
			if(err) console.error('Error checking category of Test Item:', err);
			expect(err).toBe(null);
			expect(resu.length).toBe(1);
			const item = resu[0];
			expect(item.name).toBe('Test Item');
			expect(item.price).toBe('42.99');
			expect(item.quantity).toBe(100);
			expect(item.category).toBe('Lunch');
			expect(item.image).toBe('image.jpg');
		})
	})

	// image
	test("Checks for expected new image of newimage.jpg", async () => {
		const response = await request(app).post('/cafmenuupdate').send({
			name: 'Test Item',
			image: 'newimage.jpg'
		});

		db.query('SELECT * FROM CafeteriaMenu WHERE name = ?', ['Test Item'], (err, resu) => {
			if(err) console.error('Error checking image of Test Item:', err);
			expect(err).toBe(null);
			expect(resu.length).toBe(1);
			const item = resu[0];
			expect(item.name).toBe('Test Item');
			expect(item.price).toBe('42.99');
			expect(item.quantity).toBe(100);
			expect(item.category).toBe('Breakfast');
			expect(item.image).toBe('newimage.jpg');
		})
	})

	// incorrect name
	test("Checks for incorrect name input", async () => {
		const response = await request(app).post('/cafmenuupdate').send({
			name: 'Random Test Item NOT In The Database',
			quantity: 200
		});
		expect(response.statusCode).toBe(404);
	})

	// invalid input values
	test("Checks for invalid input values: price != string", async () => {
		const response = await request(app).post('/cafmenuupdate').send({
			name: 'Test Item',
			price: 'This is a test string.'
		});
		expect(response.statusCode).toBe(500);
	})
})
