import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginMock } from '../__mocks__/login.mock';
import { returnLoginMock } from '../__mocks__/returnLogin.mock';
import { returnUserMock } from '../../user/__mocks__/returnUser.mock';


describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(jwtMock),
          }
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should return user if password and e-mail valid', async () => {
    const userLogin = await service.login(loginMock);

    expect(userLogin).toEqual(returnLoginMock);
  });

  it('should return user if password invalid and e-mail valid', async () => {
    expect(service.login({...loginMock, password: "123456"})).rejects.toThrow();
  });

  it('should return user if e-mail not exists', async () => {
    jest.spyOn(userService, "getUserByEmail").mockResolvedValue(undefined);

    expect(service.login(loginMock)).rejects.toThrow();
  });

  it('should return erro in UserService', async () => {
    jest.spyOn(userService, "getUserByEmail").mockRejectedValue(new Error());

    expect(service.login(loginMock)).rejects.toThrow();
  });

});
