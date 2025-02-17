import Video from "../model/video.model.js"; // Assuming this is the path to your Video model
import ApiError from "../utils/apiError.js"; // Assuming you have a utility to handle errors
import ApiResponse from "../utils/apiResponse.js";

export async function likeVideo(req, res) {
  const { user } = req; // Assuming you're passing user object via middleware
  const { videoId } = req.params; // Video ID passed in the request parameters

  if (!user) return res.status(400).json(new ApiError(400, "Please login to like the video"));

  // Check if video exists
  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json(new ApiError(404, "Video not found"));

  // Check if the user has already liked the video
  if (video.likedBy.includes(user._id)) {
    return res.status(400).json(new ApiError(400, "You have already liked this video"));
  }

  // Add user to likedBy array and increment likes
  video.likedBy.push(user._id);
  video.likes += 1;

  // Save the video with the updated likes
  await video.save();

  return res.status(200).json(new ApiResponse(200,{likes: video.likes},"Video liked successfully"));
}


export async function unlikeVideo(req, res) {
    const { user } = req; // Assuming you're passing user object via middleware
    const { videoId } = req.params; // Video ID passed in the request parameters
  
    if (!user) return res.status(400).json(new ApiError(400, "Please login to unlike the video"));
  
    // Check if video exists
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json(new ApiError(404, "Video not found"));
  
    // Check if the user has already liked the video
    if (!video.likedBy.includes(user._id)) {
      return res.status(400).json(new ApiError(400, "You haven't liked this video yet"));
    }
  
    // Remove user from likedBy array and decrement likes
    video.likedBy = video.likedBy.filter(userId => userId.toString() !== user._id.toString());
    video.likes -= 1;
  
    // Save the video with the updated likes
    await video.save();
  
    return res.status(200).json(new ApiResponse(200,{likes:video.likes},"video unliked successfully"));
  }

  
  export async function hasUserLikedVideo(req, res) {
    const { user } = req;
    const { videoId } = req.params;

    console.log(req,"okjhjghf");

    if(!videoId)return res.status(400).json(new ApiError(400, "no video id is provided"));

    if (!user) return res.status(400).json(new ApiError(400, "Please login to check if you liked this video"));
    
    // Find the video
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json(new ApiError(404, "Video not found"));
  
    // Check if the user's ID is in the likedBy array
    const hasLiked = video.likedBy.includes(user._id);
  
    return res.status(200).json(new ApiResponse(200,{hasLiked},hasLiked?"user has liked the video":"user has not liked the video"));
  }
  