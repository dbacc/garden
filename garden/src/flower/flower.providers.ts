import { DataSource } from 'typeorm';
import { Flower } from './flower.entity';

export const flowerProviders = [
    {
        provide: 'FLOWER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Flower),
        inject: ['DATA_SOURCE'],
    },
];