import { prisma } from '../../prisma/prisma.ts';

class CityService {
  async getCities() {
    return await prisma.cities.findMany({});
  }
}

export const cityService = new CityService();
