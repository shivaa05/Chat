import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error in connecting DB: ", error);
  }
};

export default connectDb;
