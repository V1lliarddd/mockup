import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userToCreate = req.body;
      const user = await userService.createUser(userToCreate);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const updateData = req.body;
      const user = await userService.updateUser(id, updateData);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      await userService.deleteUser(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
