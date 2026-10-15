import { prisma } from '../../prisma/prisma.ts';

class RecommendationService {
  async getRecommendations(skillId: number) {
    const users = await prisma.user.findMany({
      where: {
        canTeach: {
          some: {
            subskill: {
              skill_id: skillId
            }
          }
        }
      },
      select: {
        id: true,
        name: true,
        image_path: true,
        birth_date: true,
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
                  select: { id: true, title: true, color: true }
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
                  select: { id: true, title: true, color: true }
                }
              }
            }
          }
        }
      }
    });

    function calculateAge(birthDate: Date): number {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    return users.map(({ birth_date, ...user }) => ({
      ...user,
      age: calculateAge(birth_date)
    }));
  }
}

export const recommendationService = new RecommendationService();
