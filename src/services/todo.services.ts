import { prisma } from '../../prisma/prisma.ts';
import { ITodo } from '../types/types.ts';

class TodoService {
  async getAllTodos() {
    return await prisma.todo.findMany();
  }

  async getTodoById(id: string) {
    return await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async createTodo(data: ITodo) {
    return await prisma.todo.create({
      data,
    });
  }

  async deleteTodo(id: string) {
    return await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async updateTodo(id: string, data: ITodo) {
    return await prisma.todo.update({
      where: { id: parseInt(id) },
      data,
    });
  }
}

export const todoService = new TodoService();
