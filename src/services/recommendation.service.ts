import { prisma } from '../../prisma/prisma.ts';

class RecommendationService {
  async getRecommendations(skillId: number) {
    const users = await prisma.user.findMany({
      where: {
        canTeach: {
          some: {
            subskill: { skill_id: skillId }
          }
        }
      },
      select: {
        id: true,
        name: true,
        image_path: true,
        birth_date: true,
        city: { select: { id: true, title: true } },
        canTeach: {
          select: {
            title: true,
            subskill: {
              select: {
                skill: {
                  select: { color: true }
                }
              }
            }
          }
        },
        wantsToLearn: {
          select: {
            subskill: {
              select: {
                title: true,
                skill: {
                  select: { color: true }
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

    return users.map(
      ({ birth_date, city, canTeach, wantsToLearn, ...user }) => ({
        ...user,
        city: city.title,
        age: calculateAge(birth_date),
        canTeach: canTeach.map((item) => ({
          title: item.title,
          color: item.subskill.skill.color
        })),
        wantsToLearn: wantsToLearn.map((item) => ({
          title: item.subskill.title,
          color: item.subskill.skill.color
        }))
      })
    );
  }
}

export const recommendationService = new RecommendationService();
