import ApiError from "../utils/apiError.js";
import Channel from "../model/channel.model.js";
import ApiResponse from "../utils/apiResponse.js"
// Subscribe function
export async function subscribe(req, res, next) {
    const { user } = req;
    const { channelId } = req.params;

    if (!user) {
        return res.status(400).json(new ApiError(400, "Please log in and try again"));
    }

    if (!channelId) {
        return res.status(400).json(new ApiError(400, "Please provide a channel ID in the parameters"));
    }

    const channel = await Channel.findById(channelId);
    if (!channel) {
        return res.status(404).json(new ApiError(404, "Channel does not exist with the provided ID"));
    }

    if (channel.subscribers.includes(user._id)) {
        return res.status(400).json(new ApiError(400, "User is already subscribed to this channel"));
    }

    channel.subscribers.push(user._id);
    await channel.save();

    return res.status(200).json(new ApiResponse(200, { hasSubscribed: true, subscribers: channel.subscribers.length }, "User successfully subscribed to the channel"));
}

// Unsubscribe function
export async function unsubscribe(req, res, next) {
    const { user } = req;
    const { channelId } = req.params;

    if (!user) {
        return res.status(400).json(new ApiError(400, "Please log in and try again"));
    }

    if (!channelId) {
        return res.status(400).json(new ApiError(400, "Please provide a channel ID in the parameters"));
    }

    const channel = await Channel.findById(channelId);
    if (!channel) {
        return res.status(404).json(new ApiError(404, "Channel does not exist with the provided ID"));
    }

    if (!channel.subscribers.includes(user._id)) {
        return res.status(400).json(new ApiError(400, "User is not subscribed to this channel"));
    }

    // Remove the user from the subscribers list
    channel.subscribers = channel.subscribers.filter(subscriber => subscriber.toString() !== user._id.toString());
    await channel.save();

    return res.status(200).json(new ApiResponse(200, { hasSubscribed: false, subscribers: channel.subscribers.length }, "User successfully unsubscribed from the channel"));
}

// Check subscription status
export async function hasSubscribed(req, res, next) {
    const { user } = req;
    const { channelId } = req.params;

    if (!user) {
        return res.status(400).json(new ApiError(400, "Please log in and try again"));
    }

    if (!channelId) {
        return res.status(400).json(new ApiError(400, "Please provide a channel ID in the parameters"));
    }

    const channel = await Channel.findById(channelId);
    if (!channel) {
        return res.status(404).json(new ApiError(404, "Channel does not exist with the provided ID"));
    }

    const hasSubscribed = channel.subscribers.includes(user._id);

    return res.status(200).json(new ApiResponse(200, { hasSubscribed:true, subscribers: channel.subscribers.length }, hasSubscribed ? "User has subscribed to the channel" : "User has not subscribed to the channel"));
}

