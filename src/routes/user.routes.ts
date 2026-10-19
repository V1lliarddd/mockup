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
router.post('/auth/', upload.none(), userController.authUser);
router.post('/update', upload.none(), userController.updateUser);

export default router;
