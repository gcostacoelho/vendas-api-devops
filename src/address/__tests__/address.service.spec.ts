import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { addressMock } from '../__mocks__/address.mock';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { createAddressMock } from '../__mocks__/createAddress.mock';


describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue(userEntityMock),
          }
        },
        {
          provide: CityService,
          useValue: {
            getCityById: jest.fn().mockResolvedValue(cityMock),
          }
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          }
        }
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    addressRepository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity));
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(addressRepository).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await service.createAddress(createAddressMock, userEntityMock.id);

    expect(address).toEqual(addressMock);
  });

  it('should return erro if exception in getUserById', async () => {
    jest.spyOn(userService, 'getUserById').mockRejectedValueOnce(new Error());

    expect(service.createAddress(createAddressMock, userEntityMock.id)).rejects.toThrow();
  });

  it('should return erro if exception in getCityById', async () => {
    jest.spyOn(cityService, 'getCityById').mockRejectedValueOnce(new Error());

    expect(service.createAddress(createAddressMock, userEntityMock.id)).rejects.toThrow();
  });

  it('should return all addresses to user', async () => {
    const addresses = await service.getAddressByUserId(userEntityMock.id);

    expect(addresses).toEqual([addressMock]);
  });

  it('should return not found if not address registered', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);

    expect(service.getAddressByUserId(userEntityMock.id)).rejects.toThrow();
  });

});
