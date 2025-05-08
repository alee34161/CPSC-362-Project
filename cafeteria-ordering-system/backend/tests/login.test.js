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

afterAll((done) => {
	sessionStore.close(() => {
		db.end((err) => {
			if(err) return done(err);
			done();
		});
	})
})

describe("Test login()", () => {
	// Customer
	test("Returns 201 for customer", async () => {
		const response = await request(app).post('/login').send({
			username:'customer@employee',
			password: 'test'
		});
		expect(response.statusCode).toBe(201);
	});
	// Cafeteria Employee
	test("Returns 202 for cafeteria employee", async () => {
		const response = await request(app).post('/login').send({
			username:'cafeteria@employee',
			password: 'test'
		});
		expect(response.statusCode).toBe(202);
	});

	// Delivery Driver
	test("Returns 203 for delivery driver", async () => {
		const response = await request(app).post('/login').send({
			username:'delivery@employee',
			password: 'test'
		});
		expect(response.statusCode).toBe(203);
	});

	// Menu Admin
	test("Returns 204 for menu administrator", async () => {
		const response = await request(app).post('/login').send({
			username:'root@employee',
			password: 'admin'
		});
		expect(response.statusCode).toBe(204);
	});

	// empty username
	test("Returns 400 due to empty username", async () => {
		const response = await request(app).post('/login').send({
			username:'',
			password: 'test'
		});
		expect(response.statusCode).toBe(400);
	});

	// empty password
	test("Returns 400 due to empty password", async () => {
		const response = await request(app).post('/login').send({
			username:'customer@employee',
			password: ''
		});
		expect(response.statusCode).toBe(400);
	});

	// extreme username length input
	test("Returns 400 due to long username not in database", async () => {
		const longUsername = 'u'.repeat(256);
		const response = await request(app).post('/login').send({
			username: longUsername,
			password: 'test'
		});
		expect(response.statusCode).toBe(400);
	});

	// extreme password length input
	test("Returns 400 due to long incorrect password", async () => {
		const longPassword = 'p'.repeat(256);
		const response = await request(app).post('/login').send({
			username:'customer@employee',
			password: longPassword
		});
		expect(response.statusCode).toBe(400);
	});

	// incorrect username/nonexistent user
	test("Returns 400 due to incorrect username", async () => {
		const response = await request(app).post('/login').send({
			username:'customerwrong@employee',
			password: 'test'
		});
		expect(response.statusCode).toBe(400);
	});

	// incorrect password
	test("Returns 400 due to incorrect password", async() => {
		const response = await request(app).post('/login').send({
			username: 'customer@employee',
			password: 'testwrong'
		});
		expect(response.statusCode).toBe(400);
	})
});
