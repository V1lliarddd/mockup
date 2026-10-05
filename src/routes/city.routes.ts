import express from 'express';
import { cityController } from '../controllers/city.controller';

const router = express.Router();

router.get('/', cityController.getCities);
// router.get('/:id', userController.getUserById);
// router.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

export default router;
