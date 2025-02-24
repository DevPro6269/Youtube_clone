import ApiError from "../utils/apiError.js";
import Channel from "../model/channel.model.js";
import {
  uploadVideoOnCloud,
  uploadThumbnailOnCloud,
} from "../config/cloud.config.js";
import Video from "../model/video.model.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

// Publish a video to a specific channel
export async function publishVideo(req, res) {
  const { user } = req;
  
  // Check if user is logged in
  if (!user)
    return res
      .status(400)
      .json(new ApiError(400, "user not found please login and try again"));
  
  const { channelId } = req.params;
  
  // Check if channelId is provided in request params
  if (!channelId)
    return res.status(400).json(new ApiError(400, "channel id is missing"));

  // Find the channel by its ID
  const channel = await Channel.findById(channelId);
  
  // Check if channel exists
  if (!channel)
    return res.status(400).json(new ApiError(400, "channel does not exist"));

  // Check if the logged-in user is the owner of the channel
  if (user._id.toString() !== channel.owner.toString())
    return res
      .status(400)
      .json(new ApiError(400, "you are not authorized to this process"));

  const { title, description, category } = req.body;
  
  // Validate required fields (title, description, category)
  if (!title || !description || !category)
    return res
      .status(400)
      .json(new ApiError(400, "title and description is required"));

  // Get video and thumbnail files from request
  const videoFile = req.files?.video?.[0];
  const thumbnailFile = req.files?.thumbnail?.[0];

  // Check if video and thumbnail files are uploaded
  if (!videoFile || !thumbnailFile)
    return res
      .status(404)
      .json(new ApiError(404, "video and thumbnail is required"));

  // Upload video and thumbnail to cloud
  const videoResult = await uploadVideoOnCloud(videoFile.path);
  const thumbnailResult = await uploadThumbnailOnCloud(thumbnailFile.path);

  // Create a new video record in the database
  const video = await Video.create({
    publishedBy: channel._id,
    category,
    videoUrl: videoResult.secure_url, // Store video URL
    thumbnailUrl: thumbnailResult.secure_url, // Store thumbnail URL
    description,
    title,
  });

  // Check if video creation failed
  if (!video)
    return res
      .status(500)
      .json(new ApiError(500, "error while creating video"));

  // Add video to the channel's video list and save
  channel.videos.push(video._id)
  await channel.save();

  // Return success response
  return res
    .status(201)
    .json(new ApiResponse(200, video, "video uploaded successfully"));
}

// View a video by its ID
export async function viewVideo(req, res) {
  
  const { videoId } = req.params;
  
  // Check if videoId is provided
  if (!videoId)
    return res.status(400).json(new ApiError(400, "Please provide a video id"));

  // Aggregate to fetch video details along with channel and comments data
  const video = await Video.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(videoId) },
    },
    {
      $lookup: {
        from: "channels",
        localField: "publishedBy",
        foreignField: "_id",
        as: "Channel",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
  ]);

  // Check if video exists
  if (!video || video.length === 0)
    return res.status(400).json(new ApiError(400, "Video does not exist"));

  // Fetch the video directly to update the view count
  const videoDoc = await Video.findById(videoId);
  
  // Check if video document exists
  if (!videoDoc) {
    return res.status(400).json(new ApiError(400, "Video does not exist"));
  }

  // Increment the view count for the video
  videoDoc.views += 1;

  // Save the updated video document
  await videoDoc.save();

  // Return the video details in response
  return res.status(200).json(new ApiResponse(200, video, "Video retrieved successfully"));
}

// Fetch all videos with optional filters
export async function getAllVideos(req, res) {
  const { category, title, sortBy } = req.query;

  // Set filter criteria for category
  const filterCriteria = category && category !== 'All' ? { category } : {};

  // Set filter criteria for title if provided
  if (title) {
    filterCriteria.title = { $regex: title, $options: 'i' }
  }

  // Set sorting criteria based on the query parameter
  const sortCriteria = sortBy ? { [sortBy]: 1 } : { createdAt: -1 }
  
  // Fetch videos from the database with filter and sort criteria
  const videos = await Video.find(filterCriteria).select("-videoUrl").populate("publishedBy").sort(sortCriteria);
  
  // Check if no videos found
  if (videos.length == 0)
    return res.status(400).json(new ApiError(400, "no video found"));

  // Return the list of videos in response
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "vide retrived successfully"));
}

// Delete a video by its ID
export async function deleteVideo(req, res) {
  const { user } = req;

  // Check if user is logged in
  if (!user) {
    return res.status(400).json(new ApiError(400, "No user found, please log in and try again."));
  }

  const { videoId } = req.params;
  
  // Check if videoId is provided
  if (!videoId) {
    return res.status(400).json(new ApiError(400, "Please provide a video ID."));
  }

  // Find the video by ID
  const video = await Video.findById(videoId);
  
  // Check if video exists
  if (!video) {
    return res.status(404).json(new ApiError(404, "Video not found with the provided ID."));
  }

  // Check if the logged-in user is the owner of the video
  if (video.publishedBy.toString() !== user.channel.toString()) {
    return res.status(403).json(new ApiError(403, "You are not authorized to delete this video."));
  }

  // Try deleting the video
  try {
    // Remove video from channel's video list
    await Channel.findByIdAndUpdate(
      video.publishedBy,
      { $pull: { videos: videoId } },
      { new: true }
    );

    // Delete the video
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    
    // Check if video deletion failed
    if (!deletedVideo) {
      return res.status(500).json(new ApiError(500, "Error while deleting the video."));
    }

    // Return success response
    return res.status(200).json(new ApiResponse(200, null, "Video deleted successfully."));
  } catch (error) {
    // Catch unexpected errors
    return res.status(500).json(new ApiError(500, "Unexpected error: " + error.message));
  }
}

// Update a video's details (title/description)
export async function updateVideo(req, res) {
  const { user } = req;
  
  // Check if user is logged in
  if (!user)
    return res
      .status(400)
      .json(new ApiError(400, "no user found please login and try again"));
  
  const { videoId } = req.params;
  
  // Check if videoId is provided
  if (!videoId)
    return res.status(400).json(new ApiError(400, "please provide a video id"));

  const { title, description } = req.body; 

  // Check if any field (title or description) is provided for update
  if (!title && !description)
    return res.status(400).json(new ApiError(400, "please provide a field to edit"));
  
  // Find the video by ID
  const video = await Video.findById(videoId);
  
  // Check if video exists
  if (!video)
    return res
      .status(404)
      .json(new ApiError(404, "video not found with provided id "));
  
  // Check if user is authorized to update the video
  if (video.owner.toString() !== user._id.toString())
    return res
      .status(404)
      .json(new ApiError(403, "you are not authorized to this route"));

  // Update the video with the provided fields
  const updatedVideo = await Video.findByIdAndUpdate(videoId, {
    title,
    description
  }, { new: true });

  // Check if update failed
  if (!updatedVideo)
    return res.status(500).json(new ApiError(500, "error while updating video"));
  
  // Return success response
  return res.status(200).json(new ApiResponse(200, null, "video updated successfully"));
}
