import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product, ProductImage } from './entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  //Defino todas las entidades
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
})
export class ProductsModule {}
