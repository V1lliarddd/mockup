import { prisma } from '../../prisma/prisma.ts';

class FavoriteService {
  async addFavorite(user_id: number, liked_user_id: number) {
    if (user_id === liked_user_id) {
      throw new Error('Нельзя добавить в избранное самого себя');
    }

    const [liker, liked] = await Promise.all([
      prisma.user.findUnique({ where: { id: user_id }, select: { id: true } }),
      prisma.user.findUnique({
        where: { id: liked_user_id },
        select: { id: true }
      })
    ]);

    if (!liker) throw new Error('Пользователь не найден');
    if (!liked) throw new Error('Пользователь не найден');

    const result = await prisma.$transaction(async (tx) => {
      const like = await tx.like.create({
        data: {
          liker_id: user_id,
          liked_id: liked_user_id
        }
      });

      const updated = await tx.user.update({
        where: { id: liked_user_id },
        data: { likes_count: { increment: 1 } },
        select: { likes_count: true }
      });

      return { like, likes_count: updated.likes_count };
    });

    return result;
  }

  async getFavorites(userId: number) {
    const likes = await prisma.like.findMany({
      where: { liker_id: userId },
      select: {
        createdAt: true,
        liked: {
          select: {
            id: true,
            name: true,
            image_path: true,
            bio: true,
            birth_date: true,
            likes_count: true,
            city: { select: { id: true, title: true } },
            gender: { select: { id: true, title: true } },
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
                    skill: { select: { id: true, title: true, color: true } }
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
                    skill: { select: { id: true, title: true, color: true } }
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return likes.map(({ liked, createdAt }) => ({
      ...liked,
      age: calculateAge(liked.birth_date),
      birth_date: undefined,
      likedAt: createdAt
    }));
  }

  async removeFavorite(userId: number, likedUserId: number) {
    if (userId === likedUserId) {
      throw new Error('Нельзя удалить из избранного самого себя');
    }

    return await prisma.$transaction(async (tx) => {
      const like = await tx.like.findUnique({
        where: {
          liker_id_liked_id: {
            liker_id: userId,
            liked_id: likedUserId
          }
        }
      });

      if (!like) {
        return { removed: false, likes_count: null };
      }

      await tx.like.delete({
        where: { id: like.id }
      });

      const user = await tx.user.findUnique({
        where: { id: likedUserId },
        select: { likes_count: true }
      });

      const currentCount = user?.likes_count ?? 0;

      const updated = await tx.user.update({
        where: { id: likedUserId },
        data: {
          likes_count: {
            decrement: currentCount > 0 ? 1 : 0
          }
        },
        select: { likes_count: true }
      });

      return { removed: true, likes_count: updated.likes_count };
    });
  }
}

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const favoriteService = new FavoriteService();
