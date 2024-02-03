import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { ErrorHandler } from "../utils/error";

export const test = (req, res) => {
  res.json({ message: "API is working!!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(ErrorHandler(500, "You're not allowed to update this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(ErrorHandler(501, "Password must be at least 8 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        ErrorHandler(502, "Username length must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(ErrorHandler(503, "Username can't contain empty spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(ErrorHandler(504, "Username must be in lower case"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        ErrorHandler(505, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser: any = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(ErrorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const signoutUser = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User signed out successfully" });
  } catch (error) {
    next(error);
  }
};
