import useSWR from 'swr';

import Gist from './Gist';
import Loading from './Loading';

import { backendUrl } from 'api/url';
import { IGist } from 'types/gist';

const SearchResults = ({ search }: { search: string }) => {
	const { data, error } = useSWR<IGist[]>(
		`${backendUrl}/api/gists/public/${search}`
	);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!data) {
		return <Loading />;
	}

	return (
		<ul className="flex flex-col items-center">
			{data.map((item) => {
				return (
					<li className="w-1/3" key={item._id}>
						<Gist data={item} />
					</li>
				);
			})}
		</ul>
	);
};

export default SearchResults;
