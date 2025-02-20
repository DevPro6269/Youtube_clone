import ApiError from "../utils/apiError.js";
import Video from "../model/video.model.js";
import ApiResponse from "../utils/apiResponse.js";
import Comment from "../model/comment.model.js";

export async function createComment(req, res) {
  const { user } = req;

  if (!user)
    return res
      .status(400)
      .json(
        new ApiError(400, "user does not exist please login and try again")
      );

  const { videoId } = req.params;

  if (!videoId)
    return res.status(400).json(new ApiError(400, "please provide a video id"));

  const video = await Video.findById(videoId);
  if (!video)
    return res.status(404).json(new ApiError(404, "video does not exist"));

  const { message } = req.body;
  if (!message)
    return res
      .status(400)
      .json(new ApiError(400, "please provide a message for comment"));

  const comment = await Comment.create({
    video: video._id,
    user: user._id,
    message,
  });

  if (!comment)
    return res
      .status(500)
      .json(new ApiError(500, "error while creating a comment"));

  video.comments.push(comment._id);

  await video.save();

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "comment created succesfully"));
}

export async function updateComment(req, res) {
  const { user } = req;

  if (!user) {
    return res.status(400).json(new ApiError(400, "User not found, please log in and try again."));
  }

  const { commentId } = req.params;
  if (!commentId) {
    return res.status(400).json(new ApiError(400, "Comment ID is required in parameters."));
  }

  const { message } = req.body;
  if (!message || message.trim() === "") {
    return res.status(400).json(new ApiError(400, "Please provide a message to update."));
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json(new ApiError(404, "Comment not found."));
  }

  // Ensure the user is the author of the comment
  if (String(comment.user) !== String(user._id)) {
    return res.status(403).json(new ApiError(403, "You are not authorized to update this comment."));
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { message },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(500).json(new ApiError(500, "An error occurred while updating the comment."));
    }

    return res.status(200).json(
      new ApiResponse(200, updatedComment, "Comment updated successfully.")
    );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Unexpected error: " + error.message));
  }
}


export async function deleteComment(req, res) {
  const { user } = req;

  if (!user)
    return res
      .status(400)
      .json(new ApiError(400, "user not found please login and try again"));

  const { commentId } = req.params;
  if (!commentId)
    return res.status(400).json(new ApiError(400, "comment id not found"));

  const comment = await Comment.findById(commentId);
  if (comment.user.toString() !== user._id.toString())
    return res
      .status(403)
      .json(new ApiError(403, "you are not authorized to this process"));

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment)
    return res
      .status(500)
      .json(new ApiError(500, "error while deleting comment"));

  return res
    .status(200)
    .json(new ApiResponse(200, null, "comment deleted successfully"));
}


