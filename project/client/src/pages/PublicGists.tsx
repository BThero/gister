import useSWR from 'swr';
import Gist from 'components/Gist';
import NavBar from 'components/NavBar';
import { IGist } from 'types/gist';
import { backendUrl } from 'api/url';

const PublicGists = () => {
	const { data, error } = useSWR<IGist[]>(`${backendUrl}/api/gists/public`);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!data) {
		return null;
	}

	return (
		<>
			<NavBar current="public" />
			<main>
				<ul className="flex flex-col items-center">
					{data.map((item) => {
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
