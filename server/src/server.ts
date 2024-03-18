import app from './app';
import { connectDB } from './config/db';

connectDB();
app.listen(process.env.PORT || 80);
