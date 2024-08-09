import express from 'express';
import { authenticate } from '../../middlewares/authMiddleware.js';
import { createScore, getScore } from '../../controllers/features/scoreContoller.js';

const router = express.Router();

router.route('/')
.post(authenticate,createScore)
.get(authenticate,getScore);

export default router;