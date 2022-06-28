import useAuth from '../modules/useAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Gist from '../components/Gist';

const useQueryGists = (token: string) => {
	const [gists, setGists] = useState<any>(null);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		if (token && token.length > 0) {
			axios
				.get('http://localhost:4000/api/gists', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setGists(res.data);
				})
				.catch((err) => {
					setError(err.message);
				});
		}
	}, [token]);

	return {
		gists,
		error,
	};
};

const Home = () => {
	const { user } = useAuth();
	const { gists, error } = useQueryGists(user!.token);
	const { register, handleSubmit } = useForm();

	return (
		<div>
			<header className="p-3 text-center border-b-2 border-black">
				Hello {user!.name}!
			</header>
			<main>
				<div className="border-black border-2 p-2 mt-2">
					<p>
						Your email is: <span className="text-red-400">{user!.email}</span>
					</p>
					<p>
						Your token is: <span className="text-red-400">{user!.token}</span>
					</p>
					<p>
						Your ID is: <span className="text-red-400">{user!.id}</span>
					</p>
				</div>
				<div className="flex flex-col align-center gap-4 mt-2 p-2">
					<p className="block border-b-2 border-b-black">
						List of publicly available gists:
					</p>

					{!gists && !error && <p>loading...</p>}
					{error && <p>{error}</p>}
					{gists && (
						<ul>
							{gists.map((item: any) => (
								<Gist data={item} />
							))}
						</ul>
					)}
				</div>

				<form
					className="block border-black border-2 p-2 mt-2"
					onSubmit={handleSubmit(async (data) => {
						await axios.post(
							'http://localhost:4000/api/gists',
							{
								title: data.title,
								content: data.content,
								public: data.public,
							},
							{
								headers: {
									Authorization: `Bearer ${user!.token}`,
								},
							}
						);
					})}
				>
					<label htmlFor="gist">Submit your own gist!</label>
					<input
						className="block border-black border-2 p-2 mt-2"
						type="input"
						placeholder="Gist title"
						{...register('title')}
					/>
					<textarea
						id="gist"
						rows={5}
						className="block border-black border-2 w-1/2 mt-2"
						{...register('content')}
					/>
					<button
						type="submit"
						className="block border-black border-2 p-2 mt-2"
					>
						Submit
					</button>
					<label>Make it public: </label>
					<input type="checkbox" {...register('public')} />
				</form>
			</main>
		</div>
	);
};

export default Home;
