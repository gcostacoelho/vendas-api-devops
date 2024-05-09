import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { UserModule } from 'src/user/user.module';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [
    UserModule,
    CityModule,
    TypeOrmModule.forFeature([AddressEntity])
  ],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
