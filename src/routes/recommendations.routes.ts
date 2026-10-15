import express from 'express';
import { recommendationController } from '../controllers/recommendation.controller';

const router = express.Router();

router.get('/:id', recommendationController.getRecommendations);

export default router;
