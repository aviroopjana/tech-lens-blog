import bcryptjs from "bcryptjs";
import User from "../models/user.model";

export const test = (req, res)=> {
    res.json({ message : "API is working!!"});
}

export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.userId) {
        res.status(500).json({
            message: "You're not allowed to update this user"
        });
    }

    if (req.body.password) {
        if (req.body.password.length < 8) {
            res.status(501).json({
                message: "Password must be atleast 8 characters"
            });
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length <7 || req.body.username.length>20) {
            res.status(502).json({
                message: 'Username length must be between 7 and 20 characters'
            });
        }
        if (req.body.username.includes(' ')) {
            res.status(503).json({
                message: "Username can't contain empty spaces"
            });
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            res.status(504).json({
                message: "Username must be in lower case"
            });
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            res.status(505).json({
                message: "Username can only contain letters and numbers"
            });
        }
    }

    try {
        const updateUser: any = await User.findByIdAndUpdate(req.params.userId,{
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                profilePicture: req.body.profilePicture
            }
        }, {new: true});
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}