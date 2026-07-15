import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';

class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (e) {
      next(e);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const product = await productService.getProductById(id);
      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productToCreate = req.body;
      const product = await productService.createProduct(productToCreate);
      res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      const updateData = req.body;
      const product = await productService.updateProduct(id, updateData);
      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Array.isArray(id)) return;
      await productService.deleteProduct(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export const productController = new ProductController();
