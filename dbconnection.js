import  mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

let mongoUrl = process.env.MONGODB_URL;

export default function connectToDatabase() {
  // console.log(mongoUrl)
  mongoose.connect(mongoUrl, {
    
  });

  mongoose.connection.on('connected', () => {
    console.log('Database connected...');
  });

  mongoose.connection.on('error', (err) => {
    console.error('An error occurred:', err);
  });
}

