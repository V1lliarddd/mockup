import { prisma } from '../../prisma/prisma.ts';

class GenderService {
  async getGenders() {
    return await prisma.genders.findMany({});
  }
}

export const genderService = new GenderService();
