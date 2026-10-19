import { prisma } from '../../prisma/prisma.ts';
import { IUpdateUser, IUser } from '../types/types.ts';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'node:path';
import fs from 'node:fs/promises';

class UserService {
  async getAllUsers(id = '') {
    const userId = id ? Number(id) : null;
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
        gender: {
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

    let likedSet = new Set<number>();
    if (userId) {
      const likes = await prisma.like.findMany({
        where: { liker_id: userId },
        select: { liked_id: true }
      });

      likedSet = new Set(likes.map((l) => l.liked_id));
    }

    return users.map(({ birth_date, ...user }) => ({
      ...user,
      age: this.calculateAge(birth_date),
      isLiked: likedSet.has(user.id)
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

  async authUser({ email, password }: Pick<IUser, 'email' | 'password'>) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Неверный email или пароль');
    }

    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m'
    });

    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshTokenHash }
    });

    const { password: _, refreshToken: __, ...safeUser } = user;

    return {
      user: safeUser,
      accessToken,
      refreshToken
    };
  }

  async createUser(data: IUser) {
    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');
    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          bio: data.bio,
          birth_date: data.date_birth,
          city_id: data.city_id,
          gender_id: data.gender_id,
          image_path: data.image_path,
          refreshToken: refreshTokenHash
        }
      });

      await tx.userCanTeach.create({
        data: {
          title: data.skillTitle,
          description: data.skillDescription,
          image_1: data.image_1,
          image_2: data.image_2,
          image_3: data.image_3,
          image_4: data.image_4,
          subskill_id: Number(data.canTeachSkillId),
          user_id: createdUser.id
        }
      });

      await tx.userWantsToLearn.create({
        data: {
          subskill_id: Number(data.wantsToLearnSubskillId),
          user_id: createdUser.id
        }
      });

      return tx.user.findUnique({
        where: { id: createdUser.id },
        select: {
          id: true,
          name: true,
          email: true,
          image_path: true,
          bio: true,
          birth_date: true,
          creation_date: true,
          likes_count: true,
          city: { select: { id: true, title: true } },
          gender: { select: { id: true, title: true } }
        }
      });
    });
    const accessToken = jwt.sign({ sub: user!.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m'
    });

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async updateUser(data: IUpdateUser) {
    const existing = await prisma.user.findUnique({
      where: { id: Number(data.user_id) },
      select: { id: true, image_path: true }
    });

    if (!existing) {
      throw new Error('Пользователь не найден');
    }

    if (
      data.image_path &&
      existing.image_path &&
      data.image_path !== existing.image_path
    ) {
      const oldPath = path.join('./images/users', existing.image_path);
      await fs.unlink(oldPath).catch(() => {});
    }

    let cityId: number | undefined;
    if (data.city !== undefined) {
      const city = await prisma.cities.findFirst({
        where: { title: data.city },
        select: { id: true }
      });
      if (!city) throw new Error('Город не найден');
      cityId = city.id;
    }

    let genderId: number | undefined;
    if (data.gender !== undefined) {
      const gender = await prisma.genders.findFirst({
        where: { title: data.gender },
        select: { id: true }
      });
      if (!gender) throw new Error('Пол не найден');
      genderId = gender.id;
    }
    const updated = await prisma.user.update({
      where: { id: Number(data.user_id) },
      data: {
        ...(data.email !== undefined &&
          data.email !== '' && { email: data.email }),
        ...(data.name !== undefined && { name: data.name }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.date_birth !== undefined && {
          birth_date: new Date(data.date_birth)
        }),
        ...(cityId !== undefined && { city_id: cityId }),
        ...(genderId !== undefined && { gender_id: genderId }),
        ...(data.password !== undefined &&
          data.password !== '' && { password: data.password }),
        ...(data.image_path !== undefined && { image_path: data.image_path })
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_path: true,
        bio: true,
        birth_date: true,
        creation_date: true,
        likes_count: true,
        city: { select: { id: true } },
        gender: { select: { id: true } }
      }
    });

    const { city, gender, ...rest } = updated;

    const accessToken = jwt.sign(
      { sub: Number(data.user_id) },
      process.env.JWT_SECRET!,
      {
        expiresIn: '15m'
      }
    );

    return {
      accessToken,
      user: {
        ...rest,

        gender_id: gender.id,
        city_id: city.id
      }
    };
  }
}

export const userService = new UserService();
