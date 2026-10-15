import { prisma } from '../../prisma/prisma.ts';

class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image_path: true,
        likes_count: true,
        creation_date: true,
        birth_date: true,
        city: {
          select: { id: true, title: true }
        },
        canTeach: {
          select: {
            id: true,
            title: true,
            description: true,
            image_1: true,
            image_2: true,
            image_3: true,
            image_4: true,
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

    return users.map(({ birth_date, ...user }) => ({
      ...user,
      age: this.calculateAge(birth_date)
    }));
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image_path: true,
        bio: true,
        birth_date: true,
        city: {
          select: { id: true, title: true }
        },
        canTeach: {
          select: {
            id: true,
            title: true,
            description: true,
            image_1: true,
            image_2: true,
            image_3: true,
            image_4: true,
            subskill: {
              select: {
                id: true,
                title: true,
                skill: {
                  select: {
                    id: true,
                    title: true,
                    color: true
                  }
                }
              }
            }
          }
        },
        wantsToLearn: {
          select: {
            subskill: {
              select: {
                id: true,
                title: true,
                skill: {
                  select: {
                    id: true,
                    title: true,
                    color: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user) return null;

    return {
      ...user,
      age: this.calculateAge(user.birth_date),
      birth_date: undefined
    };
  }

  calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
