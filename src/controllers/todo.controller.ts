import { Request, Response, NextFunction } from 'express';
import { todoService } from '../services/todo.services';

class TodoController {
  async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (e) {
      next(e);
    }
  }

  async getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const todo = await todoService.getTodoById(id);
      res.json(todo);
    } catch (e) {
      next(e);
    }
  }

  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todoToCreate = req.body;
      const todo = await todoService.createTodo(todoToCreate);
      res.status(201).json(todo);
    } catch (e) {
      next(e);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const updateData = req.body;
      const todo = await todoService.updateTodo(id, updateData);
      res.json(todo);
    } catch (e) {
      next(e);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      await todoService.deleteTodo(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export const todoController = new TodoController();
