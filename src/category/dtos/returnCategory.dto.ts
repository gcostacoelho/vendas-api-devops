import { CategoryEntity } from "../entities/categoty.entity";

export class ReturnCategoryDto {
    id: number;
    name: string;

    constructor(categoryEntity: CategoryEntity){
        this.id = categoryEntity.id;
        this.name = categoryEntity.name;
    }
}