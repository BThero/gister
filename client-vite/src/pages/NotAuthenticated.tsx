import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../modules/useAuth';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const NotAuthenticated = () => {
	const { login: userLogin, register: userRegister } = useAuth();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [state, setState] = useState<'login' | 'register'>('login');
	const { register, handleSubmit } = useForm();

	return (
		<div className="flex flex-col items-center gap-2">
			<h1 className="text-2xl mt-2">
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
						type="text"
						className="block border-2 border-black p-2 mt-2 rounded w-[250px]"
						required
						{...register('name')}
						placeholder="name"
					/>
				)}
				<input
					className="block border-2 border-black p-2 mt-2 rounded w-[250px]"
					type="email"
					required
					autoComplete="email"
					{...register('email')}
					placeholder="email"
				/>
				<div className="relative">
					<input
						className="block border-2 border-black p-2 pr-8 mt-2 rounded w-[250px]"
						type={passwordVisible ? 'text' : 'password'}
						autoComplete="current-password"
						required
						{...register('password')}
						placeholder="password"
					/>
					<button
						className="text-gray-700 absolute right-2 center top-1/2 -translate-y-1/2"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							setPasswordVisible(!passwordVisible);
						}}
					>
						{!passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
					</button>
				</div>
				<div className="flex justify-between items-stretch gap-2 mt-2 rounded">
					<button
						className="flex-1 block border-2 border-pink-400 hover:text-pink-400 p-2 rounded"
						type="submit"
					>
						{state === 'login' ? 'Login' : 'Register'}
					</button>
					<button
						className="flex-1 block border-2 border-blue-400 hover:text-blue-400 p-2 text-center rounded"
						onClick={(e) => {
							e.preventDefault();
							setState(state === 'login' ? 'register' : 'login');
						}}
					>
						{state === 'login' ? 'Register' : 'Login'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default NotAuthenticated;
