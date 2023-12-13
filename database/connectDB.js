import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (selectedCollection) => {
  const mongoUrl = process.env.MONGODB_URI;
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = await client.db('mern-auth');
  const collection = db.collection(selectedCollection);
  return { client, collection };
};

export default connectDB;
