import express from 'express';
import todoRoutes from './todo.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import postRoutes from './post.routes';

const router = express.Router();

router.use('/todos', todoRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/posts', postRoutes);

export default router;
