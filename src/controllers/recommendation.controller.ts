import { Request, Response, NextFunction } from 'express';
import { recommendationService } from '../services/recommendation.service';

class RecommendationController {
  async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await recommendationService.getRecommendations(Number(id));
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export const recommendationController = new RecommendationController();
