import express from "express";
import { test, updateUser } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser)

export default router;