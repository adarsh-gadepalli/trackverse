import { config } from '../../globals/load.js';
import mongoose from "mongoose";

const uri = process.env.URI;

export const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(uri);
    console.log('Connected to database:', connection.connection.db.databaseName);

  } catch (error) {
    console.log(error);
  }
};