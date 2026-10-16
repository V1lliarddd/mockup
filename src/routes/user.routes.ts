import express from 'express';
import { userController } from '../controllers/user.controller';
import { upload } from '../config/multer';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post(
  '/register/',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 4 }
  ]),
  userController.createUser
);
// router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
