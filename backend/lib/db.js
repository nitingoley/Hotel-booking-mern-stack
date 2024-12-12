import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_CONNECTION_STRING;
if (!url) {
  throw new Error('MONGO_URL is not defined in environment variables.');
}
export const ConnectDB = async () => {
  await mongoose
    .connect(url)
    
};
