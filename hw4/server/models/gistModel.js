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
		public: {
			type: Boolean,
			required: [true, 'Please add visibility of the gist'],
		},
		author: {
			type: String,
			required: [true, 'Please add an author of the gist'],
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
