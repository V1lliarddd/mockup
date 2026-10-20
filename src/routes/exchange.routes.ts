import express from 'express';
import { exchangeController } from '../controllers/exchange.controller';
import { upload } from '../config/multer';

const router = express.Router();

router.post('/send', upload.none(), exchangeController.sendExchange);

export default router;
