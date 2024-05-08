import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]>{
        const citiesCache: CityEntity[] = await this.cacheManager.get(`state_${stateId}`);

        if (citiesCache){
            return citiesCache;
        }else{
            const cities = await this.cityRepository.find({
                where: {
                    stateId,
                },
            });
            
            this.cacheManager.set(`state_${stateId}`, cities);
            
            return cities;
        }
        
    }

}
