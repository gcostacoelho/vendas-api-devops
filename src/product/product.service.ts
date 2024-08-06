import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/produc.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }

    async getAllProducts(): Promise<ProductEntity[]> {
        try {
            const products = await this.productRepository.find();

            if (!products || products.length === 0) {
                throw new NotFoundException('Not found products');
            }

            return products;
        } catch (error){
            throw new InternalServerErrorException(error);
        }
    }

}
