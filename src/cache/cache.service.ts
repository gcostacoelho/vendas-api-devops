import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

    async getCache<T>(key: string, functionRequest: () => Promise<T>): Promise<T>{
        const allData: T = await this.cacheManager.get(key);

        if (allData){
            return allData;
        }else{
            const data: T = await functionRequest();
            
            this.cacheManager.set(key, data);   
            
            return data;
        }
        
    }
}
