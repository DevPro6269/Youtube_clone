import mongoose from "mongoose";
import Channel from "../model/channel.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { uploadProfileOnCloud } from "../config/cloud.config.js";

export async function createChannel(req, res) {
  const { user } = req;
  if (!user)
    return res
      .status(404)
      .json(new ApiError(404, "user not found please login and try again"));
  const { channelName, description } = req.body;
  
  
  const profilePath = req.file?.path
     if(!profilePath)return res.status(400).json(new ApiError(400,"please provide a profile for channel"))
  if (!channelName)
    return res.status(400).json(new ApiError(400, "channel name is mandotry"));

  const channelNameExist = await Channel.findOne({ channelName });

  if (channelNameExist)
    return res
      .status(400)
      .json(new ApiError(400, "channel name already taken"));
    
  const isChannelExist = await Channel.findOne({ owner: user._id });

  if (isChannelExist)
    return res
      .status(400)
      .json(new ApiError(400, "user have already a channel"));
 
const profile = await uploadProfileOnCloud(profilePath)

console.log(profile);


  const channel = await Channel.create({
    owner: user._id,
    channelName,
    description,
    profile:profile.secure_url
  });

  if (!channel)
    return res
      .status(500)
      .json(new ApiError(500, "error while creating a channel"));


  user.channel = channel._id;

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, channel, "channel is created successfully"));
}

export async function updateChannel(req, res) {
  const { user } = req;
  if (!user)
    return res
      .status(404)
      .json(new ApiError(404, "user not found please login and try again"));
  const { channelId } = req.params;
  if (!channelId)
    return res
      .status(404)
      .json(new ApiError(404, "channel id is missing in parameter"));

  const { channelName, description } = req.body;

  if (!channelName && !description)
    return res
      .status(400)
      .json(new ApiError(400, "please provide field to update"));
  const updatedChannel = await Channel.findByIdAndUpdate(
    channelId,
    {
      channelName,
      description,
    },
    {
      new: true,
    }
  );

  if (!updatedChannel)
    return res
      .status(404)
      .json(new ApiError(404, "channel does not exist with provide id "));
  return res
    .status(201)
    .json(
      new ApiResponse(201, updatedChannel, "channel is updated successfully")
    );
}

export async function getChannelDetails(req, res) {
  const { channelId } = req.params;
  if (!channelId)
    return res
      .status(400)
      .json(new ApiError(400, "channel id is missing in parameter"));

  const channel = await Channel.aggregate([
    {
      $match: {
        _id:  new mongoose.Types.ObjectId(channelId),
      },
    },

    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "ChannelVideos",
      },
    },
    {
      $project:{
       videos:0
      }
    }
    
  ]);



  if (channel && channel.length < 0)
    return res
      .status(404)
      .json(new ApiError(404, "channel does not exist for this id"));
  console.log(channel);
  
  return res
    .status(200)
    .json(new ApiResponse(200, channel, "channel details fetch successfully"));
}
