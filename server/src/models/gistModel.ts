import mongoose from 'mongoose';
import { IUser } from './userModel';

interface IGist {
	title: string;
	content: string;
	public: boolean;
	author: string;
	user: IUser;
}

const gistSchema = new mongoose.Schema<IGist>(
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

const Gist = mongoose.model('Gist', gistSchema);

export default Gist;
export { IGist };
