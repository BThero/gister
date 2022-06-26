const mongoose = require('mongoose');

const gistSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please add gist title'],
		},
		content: {
			type: String,
			required: [true, 'Please add gist content'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Gist', gistSchema);
