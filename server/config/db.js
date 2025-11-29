import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected:${process.env.MONGO_URI} `);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
