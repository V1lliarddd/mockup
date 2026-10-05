import { Request, Response, NextFunction } from 'express';
import { skillService } from '../services/skill.service';

class SkillController {
  async getSkillsWithSubskills(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await skillService.getSkillsWithSubskills();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export const skillController = new SkillController();
