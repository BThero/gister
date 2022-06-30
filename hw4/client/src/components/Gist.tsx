import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { mutate } from 'swr';
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

const Gist = ({
	data,
	editable,
	onUpdate,
	onDelete,
}: {
	data: any;
	editable?: boolean;
	onDelete?: () => void;
	onUpdate?: (updates: any) => void;
}) => {
	const [collapsed, setCollapsed] = useState(true);
	const [allowChange, setAllowChange] = useState(false);
	const { register, handleSubmit } = useForm({
		defaultValues: {
			content: data.content,
			public: data.public,
		},
	});

	return (
		<div className="mt-2 border-2 border-black p-2 rounded">
			<div className="flex flex-row w-full items-center pl-2 pr-2">
				<p>
					{editable ? (
						<span
							className="underline hover:text-pink-400 hover:cursor-pointer"
							onClick={() => {
								const newTitle = prompt('Enter new title');

								if (!newTitle || !onUpdate || newTitle.trim().length === 0) {
									return;
								}

								onUpdate({ title: newTitle.trim() });
							}}
						>
							'{data.title}'
						</span>
					) : (
						<span>'{data.title}'</span>
					)}{' '}
					created by <em>{data.author}</em>
				</p>

				{editable && (
					<AiFillDelete
						className="ml-auto hover:cursor-pointer text-gray-600 hover:text-red-500"
						onClick={onDelete}
					/>
				)}

				<button
					className={classNames(
						'border-[1px] border-pink-400 p-1 rounded w-16 hover:text-pink-400',
						{ 'ml-2': editable },
						{ 'ml-auto': !editable }
					)}
					type="button"
					onClick={() => setCollapsed(!collapsed)}
				>
					{collapsed ? 'Show' : 'Hide'}
				</button>
			</div>
			{!collapsed && (
				<>
					<div className="block border-black p-2 m-2 border-[1px] rounded">
						<ReactMarkdown
							children={data.content}
							remarkPlugins={[remarkGfm]}
						/>
					</div>
					{editable && (
						<form
							className="mt-2 pl-2 pr-2"
							onSubmit={handleSubmit((data) => {
								console.log(`data: ${JSON.stringify(data, null, 2)}`);
								onUpdate && onUpdate(data);
							})}
						>
							<label htmlFor="content">Markdown</label>
							<textarea
								id="content"
								className="w-full p-2 h-[200px] border-black border-[1px] rounded"
								{...register('content')}
								disabled={!allowChange}
							/>

							<div className="flex items-center">
								<button
									type="button"
									onClick={() => setAllowChange(!allowChange)}
									className="inline-flex justify-center items-center border-[1px] border-pink-400 p-1 rounded w-32 hover:text-pink-400"
								>
									{allowChange ? 'Freeze Edits' : 'Start Edit'}
									<AiFillEdit className="ml-1 text-blue-600" />
								</button>
								<button
									type="submit"
									className="inline-flex justify-center items-center ml-2 border-[1px] border-pink-400 p-1 rounded w-32 hover:text-pink-400"
								>
									Submit Edits
									<AiOutlineCheck className="ml-1 text-green-600" />
								</button>

								<label className="ml-auto" htmlFor="public">
									Public
								</label>
								<input
									className="ml-2"
									id="public"
									type="checkbox"
									{...register('public')}
								/>
							</div>
						</form>
					)}
				</>
			)}
		</div>
	);
};

export default Gist;
