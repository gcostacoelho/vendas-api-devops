import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/categoty.entity';
import { ReturnCategory } from './dtos/returnCategory.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/userType.enum';


@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    async getAllCategories(): Promise<ReturnCategory[]>{
        return (await this.categoryService.getAllCategories()).map((category) => new ReturnCategory(category));
    }

}
