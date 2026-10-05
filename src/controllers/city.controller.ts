import { Request, Response, NextFunction } from 'express';
import { cityService } from '../services/city.service';

class CityController {
  async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cityService.getCities();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export const cityController = new CityController();
