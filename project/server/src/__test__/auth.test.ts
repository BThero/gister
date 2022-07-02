import request from 'supertest';
import app from '../app';
import { clear } from './utils';
import { connectDB, disconnectDB } from '../config/db';

describe('Test auth logic', () => {
	beforeAll(async () => {
		await connectDB();
		await clear();
	});

	afterAll(async () => {
		await clear();
		await disconnectDB();
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
