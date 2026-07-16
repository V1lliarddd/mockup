import { prisma } from '../../prisma/prisma.ts';
import { IProduct } from '../types/types.ts';

class ProductService {
  async getAllProducts() {
    return await prisma.product.findMany();
  }

  async getProductById(id: string) {
    return await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async createProduct(data: IProduct) {
    return await prisma.product.create({
      data,
    });
  }

  async deleteProduct(id: string) {
    return await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async updateProduct(id: string, data: IProduct) {
    return await prisma.todo.update({
      where: { id: parseInt(id) },
      data,
    });
  }
}

export const productService = new ProductService();
