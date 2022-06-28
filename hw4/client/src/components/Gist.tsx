import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Gist = ({ data }: { data: any }) => {
	return (
		<div className="block border-black border-2 w-1/2 p-2 mt-2">
			<p className="block">Title: {data.title}</p>
			<p className="block">Author: {data.author}</p>
			<p className="block">Author ID: {data.user}</p>
			<div className="block border-gray-700 p-2 m-2 border-2">
				<ReactMarkdown children={data.content} remarkPlugins={[remarkGfm]} />
			</div>
		</div>
	);
};

export default Gist;
