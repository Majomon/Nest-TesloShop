import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class SeedService {
  constructor(private readonly ProductsService: ProductsService) {}

  async runSeed() {
    await this.createInitialData();
    return 'Seed executed successfully';
  }

  private async createInitialData() {
    await this.ProductsService.deleteAllProducts();
    return 'Initial data created successfully';
  }
}
