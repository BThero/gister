import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import gistRoutes from './routes/gistRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware';
import { IUser } from './models/userModel';
import { HydratedDocument } from 'mongoose';

dotenv.config();

connectDB();

// declare req.user object
declare global {
	namespace Express {
		interface Request {
			user?: HydratedDocument<IUser>;
		}
	}
}

const app = express();
const port = 4000;

app.use((_req: Request, res: Response, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/gists', gistRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port);

export default app;
