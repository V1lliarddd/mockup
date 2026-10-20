import { Request, Response, NextFunction } from 'express';
import { exchangeService } from '../services/exchange.service';

class ExchangeController {
  async sendExchange(req: Request, res: Response, next: NextFunction) {
    try {
      const { initiator_id, receiver_id } = req.body;
      console.log(initiator_id);
      const data = await exchangeService.sendExchange(
        Number(initiator_id),
        Number(receiver_id)
      );
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  //   async removeFromFavorites(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const user_id = Number(req.params.userId);
  //       const liked_user_id = Number(req.query.liked);
  //       const data = await favoriteService.removeFavorite(user_id, liked_user_id);
  //       res.json(data);
  //     } catch (e) {
  //       next(e);
  //     }
  //   }

  //   async getFavorites(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const user_id = Number(req.params.userId);
  //       const data = await favoriteService.getFavorites(user_id);

  //       res.json(data);
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
}

export const exchangeController = new ExchangeController();
