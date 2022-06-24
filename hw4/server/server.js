const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/gists', require('./routes/gists'));
app.use(errorHandler);

app.listen(port, () => {
	console.log(`server started at port ${port}`);
});
