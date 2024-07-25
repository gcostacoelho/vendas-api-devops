import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/categoty.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';


@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
    ) { };

    async getAllCategories(): Promise<CategoryEntity[]> {
        try {
            const categories = await this.categoryRepository.find();

            if (!categories || categories.length === 0) {
                throw new NotFoundException('Categories empty');
            }

            return categories;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    async createCategory(createCategory: CreateCategoryDto): Promise<CategoryEntity> {
        try {
            const category = await this.categoryRepository.save(createCategory);

            return category;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }
}
