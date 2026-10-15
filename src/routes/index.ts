import express from 'express';
import userRoutes from './user.routes';
import skillRoutes from './skill.routes';
import cityRoutes from './city.routes';
import genderRoutes from './gender.routes';
import recommendationRoutes from './recommendations.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/skills', skillRoutes);
router.use('/cities', cityRoutes);
router.use('/genders', genderRoutes);
router.use('/recommendations', recommendationRoutes);

export default router;
