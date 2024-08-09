import express from 'express';
import { authenticate } from '../../middlewares/authMiddleware.js';
import { createQuiz, getQuiz } from '../../controllers/features/quizController.js';

const router  = express.Router();

router.route('/:level')
.post(authenticate,createQuiz)
.get(authenticate,getQuiz);

export default router;