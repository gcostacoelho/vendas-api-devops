import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService,
    ) { }

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        try {
            return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`,
                () => this.cityRepository.find({
                    where: {
                        stateId,
                    },
                })
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    async getCityById(cityId: number): Promise<CityEntity> {
        try {
            const city = await this.cityRepository.findOne({
                where: {
                    id: cityId,
                },
            });

            if (!city) {
                throw new NotFoundException(`CityId: ${cityId} not found`);
            }

            return city;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

}
