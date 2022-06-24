const mongoose = require('mongoose');

const gistScheme = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please add gist title'],
		},
		content: {
			type: String,
			required: [true, 'Please add gist content'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = {
	Gist: mongoose.model('Gist', gistScheme),
};
