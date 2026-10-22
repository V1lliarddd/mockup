import express from 'express';
import { exchangeController } from '../controllers/exchange.controller';
import { upload } from '../config/multer';

const router = express.Router();

router.post('/send', upload.none(), exchangeController.sendExchange);
router.get('/fetch/:user_id', exchangeController.fetchExchanges);

export default router;
