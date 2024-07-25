import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/categoty.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/userType.enum';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { CreateCategoryDto } from './dtos/createCategory.dto';


@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Roles(UserType.Admin, UserType.User)
    @Get()
    async getAllCategories(): Promise<ReturnCategoryDto[]>{
        return (await this.categoryService.getAllCategories()).map((category) => new ReturnCategoryDto(category));
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(@Body() createCategory: CreateCategoryDto): Promise<CategoryEntity>{
        return await this.categoryService.createCategory(createCategory);
    }

}
