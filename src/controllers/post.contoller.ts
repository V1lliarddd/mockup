import { Request, Response, NextFunction } from 'express';
import { postService } from '../services/post.service';

class PostController {
  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const post = await postService.getPostById(id);
      res.json(post);
    } catch (e) {
      next(e);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const postToCreate = req.body;
      const post = await postService.createPost(postToCreate);
      res.status(201).json(post);
    } catch (e) {
      next(e);
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const updateData = req.body;
      const post = await postService.updatePost(id, updateData);
      res.json(post);
    } catch (e) {
      next(e);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      await postService.deletePost(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export const postController = new PostController();
