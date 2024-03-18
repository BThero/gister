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

	test('Should handle gists CRUD correctly', async () => {
		let token: string = '';

		await request(app)
			.post('/api/users')
			.send({
				name: 'Temirlan',
				email: 'jest@example.com',
				password: '12345',
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.then((res) => {
				token = res.body.token;
				expect(token).toBeTruthy();
				expect(token).not.toBe('');
			});

		// Get

		await request(app)
			.get('/api/gists')
			.set('Authorization', `Bearer ${token}`)
			.expect(200);

		// Post

		let id: string = '';

		await request(app)
			.post('/api/gists')
			.send({
				title: 'Test Gist',
				content: 'Test Content',
				public: true,
			})
			.set('Authorization', `Bearer ${token}`)
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				id = res.body._id;
				expect(id).toBeTruthy();
				expect(id).not.toBe('');
			});

		// Put

		await request(app)
			.put(`/api/gists/${id}`)
			.send({
				title: 'Test Gist 2',
				content: 'Test Content 2',
				public: false,
			})
			.set('Authorization', `Bearer ${token}`)
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.body.title).toEqual('Test Gist 2');
				expect(res.body.content).toEqual('Test Content 2');
				expect(res.body.public).toEqual(false);
			});

		// Delete

		await request(app)
			.delete(`/api/gists/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect('Content-Type', /json/)
			.expect(200);
	});
});
