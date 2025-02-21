import ApiError from "../utils/apiError.js";
import Channel from "../model/channel.model.js";
import {
  uploadVideoOnCloud,
  uploadThumbnailOnCloud,
} from "../config/cloud.config.js";
import Video from "../model/video.model.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";



export async function publishVideo(req, res) {
  const { user } = req;
  
  if (!user)
    return res
      .status(400)
      .json(new ApiError(400, "user not found please login and try again"));
  const { channelId } = req.params;
  if (!channelId)
    return res.status(400).json(new ApiError(400, "channel id is missing"));

  const channel = await Channel.findById(channelId);
  if (!channel)
    return res.status(400).json(new ApiError(400, "channel does not exist"));

  if (user._id.toString() !== channel.owner.toString())
    return res
      .status(400)
      .json(new ApiError(400, "you are not authorized to this process"));

  const { title, description, category , } = req.body;
  if (!title || !description||!category)
    return res
      .status(400)
      .json(new ApiError(400, "title and description is required"));

  const videoFile = req.files?.video?.[0];
  const thumbnailFile = req.files?.thumbnail?.[0];


  if (!videoFile || !thumbnailFile)
    return res
      .status(404)
      .json(new ApiError(404, "video and thumbnail is required"));

  const videoResult = await uploadVideoOnCloud(videoFile.path);
  const thumbnailResult = await uploadThumbnailOnCloud(thumbnailFile.path);
  

  const video = await Video.create({
    publishedBy: channel._id,
    category,
    videoUrl: videoResult.secure_url, // Store video URL
    thumbnailUrl: thumbnailResult.secure_url, // Store thumbnail URL
    description,
    title,
  });

  if (!video)
    return res
      .status(500)
      .json(new ApiError(500, "error while creating video"));

      channel.videos.push(video._id)
      await channel.save()
  return res
    .status(201)
    .json(new ApiResponse(200, video, "video uploaded successfully"));
}

export async function viewVideo(req, res) {
  
  const { videoId } = req.params;
  if (!videoId)
    return res.status(400).json(new ApiError(400, "Please provide a video id"));
  



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

  if (!video || video.length === 0)
    return res.status(400).json(new ApiError(400, "Video does not exist"));

  // Now we fetch the video directly to update the view count
  const videoDoc = await Video.findById(videoId);
  
  if (!videoDoc) {
    return res.status(400).json(new ApiError(400, "Video does not exist"));
  }

  // Increment the view count
  videoDoc.views += 1;

  // Save the updated video
  await videoDoc.save();

  return res.status(200).json(new ApiResponse(200, video, "Video retrieved successfully"));
}


export async function getAllVideos(req, res) {

 const {category,title,sortBy} = req.query;

 const filterCriteria = category && category !== 'All' ? { category } : {};

 if(title){
  filterCriteria.title = { $regex: title, $options: 'i' }
 }

 const sortCriteria = sortBy ? { [sortBy]: 1 } : { createdAt: -1 }
 
  const videos = await Video.find(filterCriteria).select("-videoUrl").populate("publishedBy").sort(sortCriteria)
  if (videos.length == 0)
    return res.status(400).json(new ApiError(400, "no video found"));

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "vide retrived successfully"));
}

export async function deleteVideo(req, res) {
  const { user } = req;

  if (!user) {
    return res.status(400).json(new ApiError(400, "No user found, please log in and try again."));
  }

  const { videoId } = req.params;
  if (!videoId) {
    return res.status(400).json(new ApiError(400, "Please provide a video ID."));
  }

  // Find the video by ID
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json(new ApiError(404, "Video not found with the provided ID."));
  }
  // Check if the logged-in user is the owner of the video
  if (video.publishedBy.toString()!== user.channel.toString()) {
    return res.status(403).json(new ApiError(403, "You are not authorized to delete this video."));
  }

  // Delete the video from the Video collection
  try {
    // Remove the video from the associated Channel's video list (assuming the channel has a `videos` field)
    await Channel.findByIdAndUpdate(
      video.publishedBy,
      { $pull: { videos: videoId } },
      { new: true }
    );

    // Now delete the video
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    
    if (!deletedVideo) {
      return res.status(500).json(new ApiError(500, "Error while deleting the video."));
    }

    return res.status(200).json(new ApiResponse(200, null, "Video deleted successfully."));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Unexpected error: " + error.message));
  }
}


export async function updateVideo(req, res) {
    const { user } = req;
    if (!user)
      return res
        .status(400)
        .json(new ApiError(400, "no user found please login and try again"));
    const { videoId } = req.params;
    if (!videoId)
      return res.status(400).json(new ApiError(400, "please provide a video id"));
    const{title,description}= req.body; 
  
     if(!title&&!description) return res.status(400).json(new ApiError(400,"please provide a field to edit"))
  
    const video = await Video.findById(videoId);
    if (!video)
      return res
        .status(404)
        .json(new ApiError(404, "video not fount with provided id "));
  
    if (video.owner.toString() !== user._id.toString())
      return res
        .status(404)
        .json(new ApiError(403, "you are not authorixed to this route"));
  

  
        const updatedVideo= await Video.findByIdAndUpdate(videoId,{
            title,
            description
        },{new:true});
  
        if(!updatedVideo)return res.status(500).json(new ApiError(500,"error while deleting video"))
         
         return res.status(200).json(new ApiResponse(200,null,"video deleted successfully")) 
  
  }
