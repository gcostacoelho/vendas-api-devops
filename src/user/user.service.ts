import { BadGatewayException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async getAllUsers(): Promise<UserEntity[]> {
        try {
            return this.userRepository.find();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    async getUserById(userId: number): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                }
            });

            if (!user) {
                throw new NotFoundException(`UserId: ${userId} not found`);
            }

            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    async getUserByEmail(userEmail: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: userEmail,
                }
            });

            if (!user) {
                throw new NotFoundException(`UserEmail: ${userEmail} not found`);
            }

            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        try {
            return this.userRepository.findOne({
                where: {
                    id: userId,
                },
                relations: {
                    addresses: {
                        city: {
                            state: true
                        }
                    }
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const userExist = await this.getUserByEmail(createUserDto.email).catch(() => undefined);

            if (userExist) {
                throw new ConflictException('E-mail registered in system');
            }

            const saltOrRounds = 10;
            const passwordHashed = await hash(createUserDto.password, saltOrRounds);

            const user = await this.userRepository.save({
                ...createUserDto,
                typeUser: 1,
                password: passwordHashed
            });

            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }
}
