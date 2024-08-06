import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/produc.entity";

export const productMock: ProductEntity = {
    categoryId: categoryMock.id,
    createdAt: new Date(),
    id: 5,
    image: 'http://image.com',
    name: 'name product mock',
    price: 35.85,
    updatedAt: new Date(),
}