import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Function to upload a video to Cloudinary
async function uploadVideoOnCloud(filepath) {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: 'video', // Indicate that this is a video file
      public_id: `youtube_video_${Date.now()}`, // Use a timestamp-based public ID to ensure uniqueness
      folder: 'Youtube', // Store videos in the 'Youtube' folder
      eager: [{ width: 400, height: 300, crop: 'pad' }] // Optional: Transcoding options (resize)
    });

    // Returning the result, which includes video metadata (URL, format, etc.)
    return result; // This will include the video URL and other details
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error; // Rethrow the error for further handling
  }
}

// Function to upload a thumbnail to Cloudinary
async function uploadThumbnailOnCloud(filepath) {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: 'image', // Correct resource type for images (thumbnails)
      public_id: `youtube_thumbnail_${Date.now()}`, // Use a timestamp-based public ID to ensure uniqueness
      folder: 'Youtube', // Store images in the 'Youtube' folder
      eager: [{ width: 400, height: 300, crop: 'pad' }] // Optional: Transcoding options (resize)
    });

    // Returning the result, which includes image metadata (URL, format, etc.)
    return result; // This will include the image URL and other details
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    throw error; // Rethrow the error for further handling
  }
}

async function uploadProfileOnCloud(filepath) {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: 'image', // Correct resource type for images (thumbnails)
      public_id: `youtube_thumbnail_${Date.now()}`, // Use a timestamp-based public ID to ensure uniqueness
      folder: 'Youtube', // Store images in the 'Youtube' folder
      eager: [{ width: 400, height: 300, crop: 'pad' }] // Optional: Transcoding options (resize)
    });

    // Returning the result, which includes image metadata (URL, format, etc.)
    return result; // This will include the image URL and other details
  } catch (error) {
    console.error("Error uploading profile:", error);
    throw error; // Rethrow the error for further handling
  }
}

export { uploadVideoOnCloud, uploadThumbnailOnCloud , uploadProfileOnCloud};
