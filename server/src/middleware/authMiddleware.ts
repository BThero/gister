import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { Types } from 'mongoose';

export interface IJwtPayload {
	id: Types.ObjectId;
}

const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				// Get token from header
				token = req.headers.authorization.split(' ')[1];

				// Verify token
				const decoded = verify(token, process.env.JWT_SECRET) as IJwtPayload;
				// Get user from the token
				req.user = await User.findById(decoded.id).select('-password');

				next();
			} catch (error) {
				res.status(401);
				throw new Error('Not authorized');
			}
		}

		if (!token) {
			res.status(401);
			throw new Error('Not authorized, no token');
		}
	}
);

export { protect };
