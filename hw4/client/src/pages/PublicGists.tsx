import useSWR from 'swr';
import Gist from 'components/Gist';
import NavBar from 'components/NavBar';

const PublicGists = () => {
	const { data, error } = useSWR('http://localhost:4000/api/gists/public');

	if (!data && !error) {
		return null;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<NavBar current="public" />
			<main>
				<ul className="flex flex-col items-center">
					{data.map((item: any) => {
						return (
							<li className="w-1/3" key={item._id}>
								<Gist data={item} />
							</li>
						);
					})}
				</ul>
			</main>
		</>
	);
};

export default PublicGists;
