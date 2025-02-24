import ApiError from "../utils/apiError.js";
import Video from "../model/video.model.js";
import ApiResponse from "../utils/apiResponse.js";
import Comment from "../model/comment.model.js";

// Function to create a new comment
export async function createComment(req, res) {
  const { user } = req;

  // Check if user is logged in
  if (!user)
    return res
      .status(400)
      .json(
        new ApiError(400, "user does not exist please login and try again")
      );

  const { videoId } = req.params;

  // Ensure videoId is provided in the request parameters
  if (!videoId)
    return res.status(400).json(new ApiError(400, "please provide a video id"));

  // Check if the video exists in the database
  const video = await Video.findById(videoId);
  if (!video)
    return res.status(404).json(new ApiError(404, "video does not exist"));

  const { message } = req.body;

  // Ensure a message is provided for the comment
  if (!message)
    return res
      .status(400)
      .json(new ApiError(400, "please provide a message for comment"));

  // Create a new comment
  const comment = await Comment.create({
    video: video._id,
    user: user._id,
    message,
  });

  // Check if comment creation was successful
  if (!comment)
    return res
      .status(500)
      .json(new ApiError(500, "error while creating a comment"));

  // Push the new comment into the video's comments array
  video.comments.push(comment._id);
  await video.save();

  // Return success response with the created comment
  return res
    .status(201)
    .json(new ApiResponse(201, comment, "comment created successfully"));
}

// Function to update an existing comment
export async function updateComment(req, res) {
  const { user } = req;

  // Check if user is logged in
  if (!user) {
    return res.status(400).json(new ApiError(400, "User not found, please log in and try again."));
  }

  const { commentId } = req.params;

  // Ensure commentId is provided in the request parameters
  if (!commentId) {
    return res.status(400).json(new ApiError(400, "Comment ID is required in parameters."));
  }

  const { message } = req.body;

  // Ensure the new message for the comment is provided
  if (!message || message.trim() === "") {
    return res.status(400).json(new ApiError(400, "Please provide a message to update."));
  }

  // Check if the comment exists
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json(new ApiError(404, "Comment not found."));
  }

  // Ensure the user is the author of the comment
  if (String(comment.user) !== String(user._id)) {
    return res.status(403).json(new ApiError(403, "You are not authorized to update this comment."));
  }

  try {
    // Update the comment message
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { message },
      { new: true } // Return the updated comment
    );

    // Check if update was successful
    if (!updatedComment) {
      return res.status(500).json(new ApiError(500, "An error occurred while updating the comment."));
    }

    // Return success response with the updated comment
    return res.status(200).json(
      new ApiResponse(200, updatedComment, "Comment updated successfully.")
    );
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json(new ApiError(500, "Unexpected error: " + error.message));
  }
}

// Function to delete an existing comment
export async function deleteComment(req, res) {
  const { user } = req;

  // Check if user is logged in
  if (!user)
    return res
      .status(400)
      .json(new ApiError(400, "user not found please login and try again"));

  const { commentId } = req.params;

  // Ensure commentId is provided in the request parameters
  if (!commentId)
    return res.status(400).json(new ApiError(400, "comment id not found"));

  // Check if the comment exists
  const comment = await Comment.findById(commentId);

  // Ensure that the user is the author of the comment
  if (comment.user.toString() !== user._id.toString())
    return res
      .status(403)
      .json(new ApiError(403, "you are not authorized to delete this comment"));

  // Delete the comment from the database
  const deletedComment = await Comment.findByIdAndDelete(commentId);

  // Check if the comment was successfully deleted
  if (!deletedComment)
    return res
      .status(500)
      .json(new ApiError(500, "error while deleting comment"));

  // Return success response for deleted comment
  return res
    .status(200)
    .json(new ApiResponse(200, null, "comment deleted successfully"));
}
