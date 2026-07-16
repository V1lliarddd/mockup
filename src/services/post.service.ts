import { prisma } from '../../prisma/prisma.ts';
import { IPost } from '../types/types.ts';

class PostService {
  async getAllPosts() {
    return await prisma.post.findMany();
  }

  async getPostById(id: string) {
    return await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async createPost(data: IPost) {
    return await prisma.post.create({
      data,
    });
  }

  async deletePost(id: string) {
    return await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async updatePost(id: string, data: IPost) {
    return await prisma.todo.update({
      where: { id: parseInt(id) },
      data,
    });
  }
}

export const postService = new PostService();
