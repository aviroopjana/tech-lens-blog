import Post from "../models/post.model";
import { ErrorHandler } from "../utils/error";

export const create = async (req, res, next) => {

  if (!req.user.isAdmin) {
    return next(ErrorHandler(403, "You are not allowed to create a post"));
  }

  if (!req.body.title || !req.body.content) {
    return next(ErrorHandler(400, "Please provide all the required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-z0-g-]/g, "-");

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    })

    try {
        const savedPost = await newPost.save();
        res.status(201).json({savedPost})
    } catch (error) {
        next(error);
    }
};
