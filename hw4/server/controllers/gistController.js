const asyncHandler = require('express-async-handler');
const { Gist } = require('../models/gistModel');

const getGists = asyncHandler(async (req, res) => {
	const gists = await Gist.find();
	res.status(200).json(gists);
});

const setGist = asyncHandler(async (req, res) => {
	if (!req.body.title || !req.body.content) {
		res.status(400);
		throw new Error('Please add a title and content');
	}

	const gist = await Gist.create({
		title: req.body.title,
		content: req.body.content,
	});

	res.status(200).json(gist);
});

const updateGist = asyncHandler(async (req, res) => {
	const gist = await Gist.findById(req.params.id);

	if (!gist) {
		res.status(400);
		throw new Error('Gist not found');
	}

	const updatedGist = await Goal.findByIdAndUpdate(req.params.id, req.body, {
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

	await gist.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGists,
	setGist,
	updateGist,
	deleteGist,
};
