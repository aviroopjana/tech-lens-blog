import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { create, deletePosts, getPosts, updatePost } from '../controllers/post.controller';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getPosts', getPosts);
router.delete('/deleteposts/:userId/:postId', verifyToken, deletePosts);
router.put('/updatepost/:userId/:postId', verifyToken, updatePost);

export default router;