import ApiError from "../utils/apiError.js"; // Utility for handling errors
import Channel from "../model/channel.model.js"; // Channel model for accessing channel data
import ApiResponse from "../utils/apiResponse.js"; // Utility for handling successful responses

// Function to subscribe to a channel
export async function subscribe(req, res, next) {
  const { user } = req; // Get the user object from the request
  const { channelId } = req.params; // Get the channel ID from the request parameters

  // Check if the user is logged in
  if (!user) {
    return res.status(400).json(new ApiError(400, "Please log in and try again"));
  }

  // Check if channel ID is provided
  if (!channelId) {
    return res.status(400).json(new ApiError(400, "Please provide a channel ID in the parameters"));
  }

  // Check if the channel exists in the database
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return res.status(404).json(new ApiError(404, "Channel does not exist with the provided ID"));
  }

  // Check if the user is already subscribed to the channel
  if (channel.subscribers.includes(user._id)) {
    return res.status(400).json(new ApiError(400, "User is already subscribed to this channel"));
  }

  // Add the user to the subscribers list and save the channel
  channel.subscribers.push(user._id);
  await channel.save();

  // Return a success response with the updated subscriber count
  return res.status(200).json(new ApiResponse(200, { hasSubscribed: true, subscribers: channel.subscribers.length }, "User successfully subscribed to the channel"));
}

// Function to unsubscribe from a channel
export async function unsubscribe(req, res, next) {
  const { user } = req; // Get the user object from the request
  const { channelId } = req.params; // Get the channel ID from the request parameters

  // Check if the user is logged in
  if (!user) {
    return res.status(400).json(new ApiError(400, "Please log in and try again"));
  }

  // Check if channel ID is provided
  if (!channelId) {
    return res.status(400).json(new ApiError(400, "Please provide a channel ID in the parameters"));
  }

  // Check if the channel exists in the database
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return res.status(404).json(new ApiError(404, "Channel does not exist with the provided ID"));
  }

  // Check if the user is already subscribed to the channel
  if (!channel.subscribers.includes(user._id)) {
    return res.status(400).json(new ApiError(400, "User is not subscribed to this channel"));
  }

  // Remove the user from the subscribers list
  channel.subscribers = channel.subscribers.filter(subscriber => subscriber.toString() !== user._id.toString());
  await channel.save();

  // Return a success response with the updated subscriber count
  return res.status(200).json(new ApiResponse(200, { hasSubscribed: false, subscribers: channel.subscribers.length }, "User successfully unsubscribed from the channel"));
}

// Function to check the subscription status of the user to a channel
export async function hasSubscribed(req, res, next) {
  const { user } = req; // Get the user object from the request
  const { channelId } = req.params; // Get the channel ID from the request parameters

  // Check if the user is logged in
  if (!user) {
    return res.status(400).json(new ApiError(400, "Please log in and try again"));
  }

  // Check if channel ID is provided
  if (!channelId) {
    return res.status(400).json(new ApiError(400, "Please provide a channel ID in the parameters"));
  }

  // Check if the channel exists in the database
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return res.status(404).json(new ApiError(404, "Channel does not exist with the provided ID"));
  }

  // Check if the user is in the subscribers list
  const hasSubscribed = channel.subscribers.includes(user._id);

  // Return the subscription status and the subscriber count
  return res.status(200).json(new ApiResponse(200, { hasSubscribed: hasSubscribed, subscribers: channel.subscribers.length }, hasSubscribed ? "User has subscribed to the channel" : "User has not subscribed to the channel"));
}
