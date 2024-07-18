import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/userType.enum';
import { UserId } from '../decorators/userId.decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';


@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Roles(UserType.User)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(@Body() createAddressDto: CreateAddressDto, @UserId() userId: number): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId);
    }

    @Roles(UserType.User, UserType.Admin)
    @Get()
    async getAddressByUserId(@UserId() userId: number): Promise<ReturnAddressDto[]> {
        return (await this.addressService.getAddressByUserId(userId)).map(
            (address) => new ReturnAddressDto(address)
        );
    }
}
