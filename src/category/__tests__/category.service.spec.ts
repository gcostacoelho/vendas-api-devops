import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/categoty.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/createCategory.mock';


describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockResolvedValue(categoryMock),
          }
        }
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list of category', async () => {
    const categories = await service.getAllCategories();

    expect(categories).toEqual([categoryMock]);
  });

  it('should return erro in list category empty', async () => {
    jest.spyOn(categoryRepository, "find").mockResolvedValueOnce([]);
    
    expect(service.getAllCategories()).rejects.toThrow();
  });

  it('should return erro in list category exception', async () => {
    jest.spyOn(categoryRepository, "find").mockRejectedValueOnce(new Error());
    
    expect(service.getAllCategories()).rejects.toThrow();
  });

  it('should return category after save', async () => {
    const category = await service.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return erro in createCategory', async () => {
    jest.spyOn(categoryRepository, "save").mockRejectedValueOnce(new Error());

    expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

});
