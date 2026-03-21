import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;

    const response = await cloudinary.uploader.upload(filepath);

    return response.url;
  } catch (error) {
    console.log("Error in cloudinary",error);
    return null;
  }
};
