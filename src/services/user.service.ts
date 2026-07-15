import { prisma } from '../../prisma/prisma.ts';
import { IUser } from '../types/todo.types.ts';

class UserService {
  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async createUser(data: IUser) {
    return await prisma.user.create({
      data,
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async updateUser(id: string, data: IUser) {
    return await prisma.todo.update({
      where: { id: parseInt(id) },
      data,
    });
  }
}

export const userService = new UserService();
