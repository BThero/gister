import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	if (!res.statusCode) {
		res.status(500);
	}

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
	});
};

export { errorHandler };
