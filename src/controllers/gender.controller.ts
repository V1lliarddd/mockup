import { Request, Response, NextFunction } from 'express';
import { genderService } from '../services/gender.service';

class GenderController {
  async getGenders(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await genderService.getGenders();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export const genderController = new GenderController();
