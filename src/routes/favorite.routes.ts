import express from 'express';
import { favoriteController } from '../controllers/favorites.controller';

const router = express.Router();

router.post('/add/:userId', favoriteController.addFavorite);
router.post('/remove/:userId', favoriteController.removeFromFavorites);
router.get('/:userId', favoriteController.getFavorites);

export default router;
