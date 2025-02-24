import mongoose from "mongoose";
import Channel from "../model/channel.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { uploadProfileOnCloud } from "../config/cloud.config.js";

// Function to create a new channel
export async function createChannel(req, res) {
  const { user } = req;
  // Check if the user is logged in
  if (!user)
    return res
      .status(404)
      .json(new ApiError(404, "user not found please login and try again"));
  
  const { channelName, description } = req.body;

  // Check if profile image is provided
  const profilePath = req.file?.path;
  if (!profilePath)
    return res
      .status(400)
      .json(new ApiError(400, "please provide a profile for channel"));

  // Check if channel name is provided
  if (!channelName)
    return res.status(400).json(new ApiError(400, "channel name is mandatory"));

  // Check if the channel name already exists
  const channelNameExist = await Channel.findOne({ channelName });
  if (channelNameExist)
    return res
      .status(400)
      .json(new ApiError(400, "channel name already taken"));

  // Check if the user already has a channel
  const isChannelExist = await Channel.findOne({ owner: user._id });
  if (isChannelExist)
    return res
      .status(400)
      .json(new ApiError(400, "user already has a channel"));

  // Upload profile image to cloud
  const profile = await uploadProfileOnCloud(profilePath);

  // Create a new channel
  const channel = await Channel.create({
    owner: user._id,
    channelName,
    description,
    profile: profile.secure_url,
  });

  // Check if channel creation was successful
  if (!channel)
    return res
      .status(500)
      .json(new ApiError(500, "error while creating a channel"));

  // Assign the channel to the user
  user.channel = channel._id;
  await user.save();

  // Return success response with created channel
  return res
    .status(201)
    .json(new ApiResponse(201, channel, "channel is created successfully"));
}

// Function to update channel details
export async function updateChannel(req, res) {
  const { user } = req;
  // Check if the user is logged in
  if (!user)
    return res
      .status(404)
      .json(new ApiError(404, "user not found please login and try again"));
  
  const { channelId } = req.params;
  // Check if channel ID is provided in the request parameters
  if (!channelId)
    return res
      .status(404)
      .json(new ApiError(404, "channel id is missing in parameter"));

  const { channelName, description } = req.body;

  // Ensure that at least one field (channelName or description) is provided for update
  if (!channelName && !description)
    return res
      .status(400)
      .json(new ApiError(400, "please provide field to update"));

  // Update the channel details
  const updatedChannel = await Channel.findByIdAndUpdate(
    channelId,
    {
      channelName,
      description,
    },
    {
      new: true, // Return the updated channel object
    }
  );

  // Check if the channel exists before updating
  if (!updatedChannel)
    return res
      .status(404)
      .json(new ApiError(404, "channel does not exist with provided id"));

  // Return success response with updated channel details
  return res
    .status(201)
    .json(
      new ApiResponse(201, updatedChannel, "channel is updated successfully")
    );
}

// Function to get channel details
export async function getChannelDetails(req, res) {
  const { channelId } = req.params;
  // Check if channel ID is provided in the request parameters
  if (!channelId)
    return res
      .status(400)
      .json(new ApiError(400, "channel id is missing in parameter"));

  // Fetch the channel details along with its videos
  const channel = await Channel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(channelId),
      },
    },

    {
      $lookup: {
        from: "videos", // Join with the "videos" collection
        localField: "videos", // Channel's videos field
        foreignField: "_id", // Video's _id field
        as: "ChannelVideos", // Alias for the video data
      },
    },
    {
      $project: {
        videos: 0, // Exclude the original 'videos' field from the response
      },
    },
  ]);

  // Check if the channel exists
  if (channel && channel.length < 0)
    return res
      .status(404)
      .json(new ApiError(404, "channel does not exist for this id"));

  // Return success response with channel details
  return res
    .status(200)
    .json(new ApiResponse(200, channel, "channel details fetched successfully"));
}
