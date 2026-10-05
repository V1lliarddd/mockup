import express from 'express';
import userRoutes from './user.routes';
import skillRoutes from './skill.routes';
import cityRoutes from './city.routes';
import genderRoutes from './gender.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/skills', skillRoutes);
router.use('/cities', cityRoutes);
router.use('/genders', genderRoutes);

export default router;
