import express from 'express';
import { genderController } from '../controllers/gender.controller';

const router = express.Router();

router.get('/', genderController.getGenders);

export default router;
