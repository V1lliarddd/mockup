import { prisma } from '../../prisma/prisma.ts';
import { IUser } from '../types/types.ts';

class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image_path: true,
        likes_count: true,
        creation_date: true,
        city: {
          select: { id: true, title: true }
        },
        canTeach: {
          select: {
            title: true,
            subskill: {
              select: {
                id: true,
                title: true,
                skill: {
                  select: {
                    id: true,
                    title: true,
                    color: true,
                    icon_src: true
                  }
                }
              }
            }
          }
        },
        wantsToLearn: {
          select: {
            title: true,
            subskill: {
              select: {
                id: true,
                title: true,
                skill: {
                  select: {
                    id: true,
                    title: true,
                    color: true,
                    icon_src: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    });
  }

  // async createUser(data: IUser) {
  //   return await prisma.user.create({
  //     data
  //   });
  // }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: {
        id: parseInt(id)
      }
    });
  }

  // async updateUser(id: string, data: IUser) {
  //   return await prisma.todo.update({
  //     where: { id: parseInt(id) },
  //     data
  //   });
  // }
}

export const userService = new UserService();
