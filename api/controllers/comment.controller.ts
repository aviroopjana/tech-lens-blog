import Comment from "../models/comment.model";
import { ErrorHandler } from "../utils/error";

export const createComment = async (req, res, next) => {
  const { content, userId, postId } = req.body;

  if (req.user.id !== userId) {
    return next(ErrorHandler(403, "You're not allowed to comment"));
  }

  try {
    const newComment = new Comment({
      content: content,
      userId: userId,
      postId: postId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};
