import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly ProductsService: ProductsService) {}

  async runSeed() {
    await this.createInitialData();
    return 'Seed executed successfully';
  }

  private async createInitialData() {
    await this.ProductsService.deleteAllProducts();

    const products = initialData.products;

    const inserPromises: Promise<any>[] = [];

    products.forEach((product) => {
      inserPromises.push(this.ProductsService.create(product));
    });

    await Promise.all(inserPromises);

    return 'Initial data created successfully';
  }
}
