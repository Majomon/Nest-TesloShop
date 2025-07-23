import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '.';

@Entity({
  name: 'product_images',
})
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  // Referencia a un producto
  @ManyToOne(() => Product, (product) => product.images, {
    /* Al borrarse un producto, en cascada se eliminan las imagenes asociadas al producto */
    onDelete: 'CASCADE',
  })
  product: Product;
}
