import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { create, deletePosts, getPosts } from '../controllers/post.controller';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getPosts', getPosts);
router.delete('/deleteposts/:userId/:postId', verifyToken, deletePosts);

export default router;