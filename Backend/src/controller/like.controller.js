import Video from "../model/video.model.js"; // Assuming this is the path to your Video model
import ApiError from "../utils/apiError.js"; // Assuming you have a utility to handle errors
import ApiResponse from "../utils/apiResponse.js";

// Function to handle liking a video
export async function likeVideo(req, res) {
  const { user } = req; // Get the user object, assumed to be passed via middleware
  const { videoId } = req.params; // Get the video ID from the request parameters

  // Check if the user is logged in
  if (!user) return res.status(400).json(new ApiError(400, "Please login to like the video"));

  // Check if the video exists in the database
  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json(new ApiError(404, "Video not found"));

  // Check if the user has already liked the video
  if (video.likedBy.includes(user._id)) {
    return res.status(400).json(new ApiError(400, "You have already liked this video"));
  }

  // Add the user to the likedBy array and increment the likes count
  video.likedBy.push(user._id);
  video.likes += 1;

  // Save the updated video with the new like count
  await video.save();

  // Return a success response with the updated number of likes
  return res.status(200).json(new ApiResponse(200, { likes: video.likes }, "Video liked successfully"));
}

// Function to handle unliking a video
export async function unlikeVideo(req, res) {
  const { user } = req; // Get the user object, assumed to be passed via middleware
  const { videoId } = req.params; // Get the video ID from the request parameters

  // Check if the user is logged in
  if (!user) return res.status(400).json(new ApiError(400, "Please login to unlike the video"));

  // Check if the video exists in the database
  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json(new ApiError(404, "Video not found"));

  // Check if the user has liked the video (for unliking, they must have liked it first)
  if (!video.likedBy.includes(user._id)) {
    return res.status(400).json(new ApiError(400, "You haven't liked this video yet"));
  }

  // Remove the user from the likedBy array and decrement the likes count
  video.likedBy = video.likedBy.filter(userId => userId.toString() !== user._id.toString());
  video.likes -= 1;

  // Save the updated video with the new like count
  await video.save();

  // Return a success response with the updated number of likes
  return res.status(200).json(new ApiResponse(200, { likes: video.likes }, "Video unliked successfully"));
}

// Function to check if the user has liked the video
export async function hasUserLikedVideo(req, res) {
  const { user } = req; // Get the user object, assumed to be passed via middleware
  const { videoId } = req.params; // Get the video ID from the request parameters

  // Check if video ID is provided
  if (!videoId) return res.status(400).json(new ApiError(400, "No video ID is provided"));

  // Check if the user is logged in
  if (!user) return res.status(400).json(new ApiError(400, "Please login to check if you liked this video"));

  // Find the video in the database
  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json(new ApiError(404, "Video not found"));

  // Check if the user's ID is in the likedBy array (i.e., if the user has liked the video)
  const hasLiked = video.likedBy.includes(user._id);

  // Return a response indicating whether the user has liked the video or not
  return res.status(200).json(
    new ApiResponse(200, { hasLiked }, hasLiked ? "User has liked the video" : "User has not liked the video")
  );
}
