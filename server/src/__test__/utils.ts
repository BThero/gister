import User from '../models/userModel';
import Gist from '../models/gistModel';

export const clear = async () => {
	const user = await User.findOne({ email: 'jest@example.com' });

	if (user) {
		await Gist.deleteMany({ user: user._id });
		await user.remove();
	}
};
