import { createRequire } from "module";
const requireD = createRequire(import.meta.url);
const cloudinary = requireD("cloudinary").v2;
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
