import NavBar from 'components/NavBar';
import useSWR from 'swr';
import axios from 'axios';
import Gist from 'components/Gist';
import useAuth from 'modules/useAuth';

const ManageGists = () => {
	const { data, error, mutate } = useSWR('http://localhost:4000/api/gists');
	const { user } = useAuth();
	const token = user!.token;

	if (!data && !error) {
		return <div>loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const handleAddGist = async () => {
		const gist = await axios.post(
			`http://localhost:4000/api/gists`,
			{
				title: 'New Title',
				content: 'New Content',
				public: false,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		mutate([...data, gist]);
	};

	const handleDeleteGist = async (id: string) => {
		await axios.delete(`http://localhost:4000/api/gists/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		mutate(data.filter((item: any) => item._id !== id));
	};

	const handleUpdateGist = async (id: string, updates: any) => {
		await axios.put(`http://localhost:4000/api/gists/${id}`, updates, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		mutate(
			data.map((item: any) => {
				if (item._id === id) {
					return { ...item, updates };
				} else {
					return item;
				}
			})
		);
	};

	return (
		<>
			<NavBar current="manage" />
			<main className="flex flex-col items-center mt-2">
				<button
					className="border-[2px] border-blue-400 p-2 pl-4 pr-4 text-xl rounded w-50 hover:text-blue-400"
					onClick={() => {
						handleAddGist();
					}}
				>
					Add New Gist
				</button>
				<ul className="flex flex-col items-center w-full">
					{data.map((item: any) => {
						return (
							<li className="w-1/3" key={item._id}>
								<Gist
									data={item}
									editable
									onDelete={() => {
										handleDeleteGist(item._id);
									}}
									onUpdate={(updates) => {
										handleUpdateGist(item._id, updates);
									}}
								/>
							</li>
						);
					})}
				</ul>
			</main>
		</>
	);
};

export default ManageGists;
