import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import bcrypt from "bcrypt";

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      const topByLikes = users
        .slice()
        .sort((a, b) => b.likes_count - a.likes_count)
        .slice(0, 9);
      const newest = [...users]
        .sort((a, b) => b.creation_date.getTime() - a.creation_date.getTime())
        .slice(0, 9);
      const byName = [...users].sort((a, b) =>
        a.name.localeCompare(b.name, "ru"),
      );
      res.json({ topByLikes, newest, byName });
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const user = await userService.getUserById(Number(id));
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async authUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userService.authUser({ email, password });

      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        user: user.user,
        accessToken: user.accessToken,
      });
    } catch (e) {
      next(e);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as
        | { [field: string]: Express.Multer.File[] }
        | undefined;

      const avatar = files?.avatar?.[0]?.filename ?? null;
      const skillImages = files?.images?.map((f) => f.filename) ?? [];
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await userService.createUser({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        bio: req.body.bio ?? "",
        date_birth: new Date(req.body.date_birth),
        city_id: Number(req.body.city_id),
        gender_id: Number(req.body.gender_id),
        image_path: avatar!,
        canTeachSkillId: req.body.canTeachSkillId,
        canTeachSubskillId: req.body.canTeachSubskillId,
        image_1: skillImages[0],
        image_2: skillImages[1],
        image_3: skillImages[2],
        image_4: skillImages[3],
        skillTitle: req.body.skillTitle,
        wantsToLearnSkillId: req.body.wantsToLearnSkillId,
        wantsToLearnSubskillId: req.body.wantsToLearnSubskillId,
        skillDescription: req.body.skillDescription,
      });

      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        user: user.user,
        accessToken: user.accessToken,
      });
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
