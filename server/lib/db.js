import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );

    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    console.log("Error in connecting database ", error);
  }
};
