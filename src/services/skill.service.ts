import { prisma } from '../../prisma/prisma.ts';

class SkillService {
  async getSkillsWithSubskills() {
    return await prisma.skills.findMany({
      include: {
        subskills: {
          select: {
            id: true,
            title: true
          }
        }
      },
      orderBy: { id: 'asc' }
    });
  }
}

export const skillService = new SkillService();
