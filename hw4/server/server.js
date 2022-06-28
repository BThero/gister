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
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/gists', require('./routes/gistRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, '../client/build')));

// 	app.get('*', (req, res) =>
// 		res.sendFile(
// 			path.resolve(__dirname, '../', 'client', 'build', 'index.html')
// 		)
// 	);
// } else {
// 	app.get('/', (req, res) => res.send('Please set to production'));
// }

app.use(errorHandler);

app.listen(port, () => {
	console.log(`server started at port ${port}`);
});
