const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');

const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();
const port = 4000;

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/gists', require('./routes/gistRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

// app.listen(port, () => {
// 	console.log(`server started at port ${port}`);
// });

module.exports = app;
