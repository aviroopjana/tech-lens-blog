import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { create, getPosts } from '../controllers/post.controller';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getPosts', getPosts);

export default router;