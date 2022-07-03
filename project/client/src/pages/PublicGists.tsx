import { useDeferredValue, useState } from 'react';
import NavBar from 'components/NavBar';
import SearchResults from 'components/SearchResults';

const PublicGists = () => {
	const [value, setValue] = useState('');
	const search = useDeferredValue(value);

	return (
		<>
			<NavBar current="public" />
			<main>
				<div className="p-2 flex justify-center items-center">
					<label htmlFor="search" className="text-lg">
						Search:
					</label>
					<input
						id="search"
						name="search"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						className="border-[1px] border-black rounded p-1 ml-2"
					/>
				</div>

				<SearchResults search={search} />
			</main>
		</>
	);
};

export default PublicGists;
