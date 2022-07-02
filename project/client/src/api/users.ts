import axios from 'axios';
import { IUserSafe } from 'types/user';

export async function login(user: { email: string; password: string }) {
	const res = await axios.post<IUserSafe>(
		'http://localhost:4000/api/users/login',
		user
	);
	localStorage.setItem('session', JSON.stringify(res.data));
	return res.data;
}

export async function register(user: {
	name: string;
	email: string;
	password: string;
}) {
	const res = await axios.post<IUserSafe>(
		'http://localhost:4000/api/users',
		user
	);
	localStorage.setItem('session', JSON.stringify(res.data));
	return res.data;
}

export function logout() {
	localStorage.removeItem('session');
}
