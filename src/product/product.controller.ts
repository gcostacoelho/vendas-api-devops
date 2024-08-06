import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dtos/returnProduct.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get()
    async getAllProducts(): Promise<ReturnProductDto[]> {
        return (await this.productService.getAllProducts()).map((product) => new ReturnProductDto(product));
    }

}
