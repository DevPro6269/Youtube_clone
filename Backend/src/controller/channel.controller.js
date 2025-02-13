import mongoose from "mongoose";
import Channel from "../model/channel.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export async function createChannel(req, res) {
  const { user } = req;
  if (!user)
    return res
      .status(404)
      .json(new ApiError(404, "user not found please login and try again"));
  const { channelName, description } = req.body;

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

  const channel = await Channel.create({
    owner: user._id,
    channelName,
    description,
  });

  if (!channel)
    return res
      .status(500)
      .json(new ApiError(500, "error while creating a channel"));
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
        foreignField: "publishedBy",
        as: "Videos",
      },
    },
  ]);
  if (channel && channel.length < 0)
    return res
      .status(404)
      .json(new ApiError(404, "channel does not exist for this id"));

  return res
    .status(200)
    .json(new ApiResponse(200, channel, "channel details fetch successfully"));
}
