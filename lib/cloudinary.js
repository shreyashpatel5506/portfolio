import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, resourceType = "auto") => {
  try {
    if (!filePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder: "portfolio",
    });

    // Remove the locally saved temporary file on success
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return response;
  } catch (error) {
    // Remove the locally saved temporary file even if the upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error(
      `Cloudinary Upload Error [Type: ${resourceType}]:`,
      error.message || error,
    );
    throw error;
  }
};

// Specialized wrappers to keep your existing codebase compatible
const uploadImage = (filePath) => uploadToCloudinary(filePath, "image");
const uploadVideo = (filePath) => uploadToCloudinary(filePath, "video");

export { uploadImage, uploadVideo, uploadToCloudinary };
