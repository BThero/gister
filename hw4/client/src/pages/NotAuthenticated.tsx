import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../modules/useAuth';

const NotAuthenticated = () => {
	const { login: userLogin, register: userRegister } = useAuth();
	const [state, setState] = useState('login');
	const { register, handleSubmit } = useForm();

	return (
		<div className="flex flex-col items-center gap-2">
			<h1 className="text-lg">
				{state === 'login' ? 'Login' : 'Register'} Page
			</h1>
			<hr />
			<form
				onSubmit={handleSubmit((data) => {
					if (state === 'login') {
						userLogin({
							email: data.email,
							password: data.password,
						});
					} else {
						userRegister({
							name: data.name,
							email: data.email,
							password: data.password,
						});
					}
				})}
			>
				{state === 'register' && (
					<input
						className="block border-2 border-black p-2 mt-2"
						{...register('name')}
						placeholder="name"
					/>
				)}
				<input
					className="block border-2 border-black p-2 mt-2"
					{...register('email')}
					placeholder="email"
				/>
				<input
					className="block border-2 border-black p-2 mt-2"
					{...register('password')}
					placeholder="password"
				/>
				<div className="flex justify-between items-stretch gap-2 mt-2">
					<button className="block border-2 border-black p-2" type="submit">
						Submit
					</button>
					<button
						className="block border-2 border-black p-2 text-center"
						onClick={() => {
							setState(state === 'login' ? 'register' : 'login');
						}}
					>
						Or {state === 'login' ? 'register' : 'login'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default NotAuthenticated;
