import mongoose from 'mongoose';

const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI);
};

const disconnectDB = async () => {
	await mongoose.disconnect();
};

export { connectDB, disconnectDB };
