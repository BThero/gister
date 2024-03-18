import asyncHandler from 'express-async-handler';
import Gist from '../models/gistModel';

const getPublicGists = asyncHandler(async (req, res) => {
	const search = req.params.search || '';
	const gists = await Gist.find({
		public: true,
		$or: [
			{
				title: {
					$regex: search,
					$options: 'i',
				},
			},
			{
				author: {
					$regex: search,
					$options: 'i',
				},
			},
		],
	});

	res.status(200).json(gists);
});

const getMyGists = asyncHandler(async (req, res) => {
	const gists = await Gist.find({
		user: req.user.id,
	});

	res.status(200).json(gists);
});

const setGist = asyncHandler(async (req, res) => {
	if (
		!req.body.title ||
		req.body.content === undefined ||
		req.body.public === undefined
	) {
		res.status(400);
		throw new Error('Please add a title, content and public');
	}

	const gist = await Gist.create({
		title: req.body.title,
		content: req.body.content,
		public: req.body.public,
		author: req.user.name,
		user: req.user.id,
	});

	res.status(200).json(gist);
});

const updateGist = asyncHandler(async (req, res) => {
	const gist = await Gist.findById(req.params.id);

	if (!gist) {
		res.status(400);
		throw new Error('Gist not found');
	}

	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	if (gist.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedGist = await Gist.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGist);
});

const deleteGist = asyncHandler(async (req, res) => {
	const gist = await Gist.findById(req.params.id);

	if (!gist) {
		res.status(400);
		throw new Error('Gist not found');
	}

	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	if (gist.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await gist.remove();

	res.status(200).json({ id: req.params.id });
});

export { getMyGists, getPublicGists, setGist, updateGist, deleteGist };
