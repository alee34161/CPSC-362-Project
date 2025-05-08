const request = require('supertest');
const { app, db, dbInit, sessionStore } = require('../index');

beforeAll((done) => {
	dbInit((err) => {
		if(err) {
			return done(err);
		}
		done();
	})
})

beforeEach((done) => {
	db.query('INSERT INTO userInformation (username, password, role) VALUES (?,?,?)', ['test2@test2', 'testpassword', 'customer'], (err) => {
	if(err) return done(err);
	done();
	})
})

afterEach((done) => {
	db.query('DELETE FROM userInformation WHERE username = ?', ['test@test'], (err) => {
		if(err) return done(err);
		db.query('DELETE FROM userInformation WHERE username = ?', ['test2@test2'], (err2) => {
			if(err2) return done(err2);
			done();
		})
	})
})

afterAll((done) => {
	sessionStore.close(() => {
		db.end((err) => {
			if(err) return done(err);
			done();
		});
	})
})

describe('Test register()', () => {
	// new Customer
	test("Checks all correct/proper fields creates new customer user", async() => {
		const response = await request(app).post('/register').send({
			username: 'test@test',
			password: 'testpassword',
			role: 'customer'
		});
		expect(response.statusCode).toBe(200);
	});

	// new Cafeteria Employee
	test("Checks all correct/proper fields creates new cafeteria employee user", async() => {
		const response = await request(app).post('/register').send({
			username: 'test@test',
			password: 'testpassword',
			role: 'cafeteria'
		});
		expect(response.statusCode).toBe(200);
	})

	// new Delivery Driver
	test("Checks all correct/proper fields creates new delivery driver user", async() => {
		const response = await request(app).post('/register').send({
			username: 'test@test',
			password: 'testpassword',
			role: 'delivery'
		});
		expect(response.statusCode).toBe(200);
	})

	// new Menu Administrator
	test("Checks all correct/proper fields creates new menu administrator user", async() => {
		const response = await request(app).post('/register').send({
			username: 'test@test',
			password: 'testpassword',
			role: 'admin'
		});
		expect(response.statusCode).toBe(200);
	})

	// missing username field
	test("Checks missing username field", async() => {
		const response = await request(app).post('/register').send({
			password: 'testpassword',
			role: 'cafeteria'
		});
		expect(response.statusCode).toBe(400);
	})

	// missing password field
	test("Checks missing password field", async() => {
		const response = await request(app).post('/register').send({
			username: 'test@test',
			role: 'cafeteria'
		});
		expect(response.statusCode).toBe(400);
	})

	// missing role field
	test("Checks missing role field", async() => {
		const response = await request(app).post('/register').send({
			username: 'test@test',
			password: 'testpassword'
		});
		expect(response.statusCode).toBe(400);
	})

	// duplicate account
	test("Checks creating duplicate account username", async() => {
		const response = await request(app).post('/register').send({
			username: 'test2@test2',
			password: 'testpassword',
			role: 'cafeteria'
		});
		expect(response.statusCode).toBe(500);
	})

	// extreme username field
	test("Checks extreme username field error handling", async() => {
		const longUsername = 'u'.repeat(256);
		const response = await request(app).post('/register').send({
			username: longUsername,
			password: 'testpassword',
			role: 'cafeteria'
		});
		expect(response.statusCode).toBe(500);
	})

	// extreme password field
	test("Checks extreme password field error handling", async() => {
		const longPassword = 'p'.repeat(256);
		const response = await request(app).post('/register').send({
			username: 'test@test',
			password: longPassword,
			role: 'cafeteria'
		});
		expect(response.statusCode).toBe(500);
	})

	// extreme role field
	test("Checks extreme role field error handling", async() => {
		const longRole = 'r'.repeat(256);
		const response = await request(app).post('/register').send({
			username: 'test@test',
			password: 'testpassword',
			role: longRole
		});
		expect(response.statusCode).toBe(500);
	})
})
