const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');
const Gist = require('../models/gistModel');

const sleep = (ms) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

describe('Test auth logic', () => {
	beforeAll(async () => {
		// For MongoDB connection
		await sleep(1000);

		const user = await User.findOne({ email: 'jest@example.com' });

		if (user) {
			await Gist.deleteMany({ user: user._id });
			await user.remove();
		}
	});

	test('Should handle user register & login correctly', async () => {
		await request(app)
			.post('/api/users')
			.send({
				name: 'Temirlan',
				email: 'jest@example.com',
				password: '12345',
			})
			.expect('Content-Type', /json/)
			.expect(201);

		await request(app)
			.post('/api/users')
			.send({
				name: 'Temirlan',
				email: 'jest@example.com',
				password: '12345',
			})
			.expect(400);

		await request(app)
			.post('/api/users/login')
			.send({
				email: 'jest@example.com',
				password: '12345',
			})
			.expect('Content-Type', /json/)
			.expect(200);
	});
});
