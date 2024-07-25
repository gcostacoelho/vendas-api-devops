import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/categoty.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';


@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
    ){};

    async getAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if (!categories || categories.length === 0){
            throw new NotFoundException('Categories empty');
        }

        return categories;
    }

    async createCategory(createCategory: CreateCategoryDto): Promise<CategoryEntity> {
        const category = await this.categoryRepository.save(createCategory);

        return category;
    }
}
