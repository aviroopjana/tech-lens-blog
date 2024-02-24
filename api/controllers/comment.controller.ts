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

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(ErrorHandler(404, "Comment not found!"));
    }

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(ErrorHandler(404, "Comment not found"));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(ErrorHandler(403, "You are not allowed to edit this posr"));
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.user.body,
      },
      { new: true }
    );

    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async(req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if(!comment) {
      return next(ErrorHandler(404, 'Comment not found!'));
    }

    if(comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(ErrorHandler(403, 'You are not allowed to delete this comment'));
    }

    await Comment.findByIdAndUpdate(req.params.commentId);

    res.status(200).json('Comment has been successfully deleted');

  } catch(error) {
    next(error);
  }
}