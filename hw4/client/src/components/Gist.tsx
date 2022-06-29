import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Gist = ({ data }: { data: any }) => {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<div className="mt-2 border-2 border-black p-2 rounded">
			<div className="flex flex-row justify-between w-full items-center">
				<p>
					'{data.title}' created by <em>{data.author}</em>
				</p>
				<button
					className="border-[1px] border-pink-400 p-1 rounded w-16"
					type="button"
					onClick={() => setCollapsed(!collapsed)}
				>
					{collapsed ? 'Show' : 'Hide'}
				</button>
			</div>
			{!collapsed && (
				<div className="block border-gray-700 p-2 m-2 border-[1px] rounded">
					<ReactMarkdown children={data.content} remarkPlugins={[remarkGfm]} />
				</div>
			)}
		</div>
	);
};

export default Gist;
