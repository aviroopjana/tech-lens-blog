import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { createComment } from '../controllers/comment.controller';

const router = express.Router();

router.post('/create', verifyToken, createComment);

export default router;