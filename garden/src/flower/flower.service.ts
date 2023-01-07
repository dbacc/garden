import {
    Inject,
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Flower } from './flower.entity';

@Injectable()
export class FlowerService {
    constructor(
        @Inject('FLOWER_REPOSITORY')
        private flowerRepository: Repository<Flower>,
    ){}

    public async getFlowersByColor(color: string): Promise<Flower[]> {
        const flowers = await this.flowerRepository.find({
            where: {color: color},
        });

        if(flowers.length == 0) {
            throw new NotFoundException(`Flowers with color ${color} were not found.`);
        }

        return flowers;
    }

    public async getFlowerById(id: number): Promise<Flower> {
        const flower = await this.flowerRepository.findOne({
            where: {id: id},
        });

        if(!flower) {
            throw new NotFoundException(`Flower with id ${id} was not found.`);
        }

        return flower;
    }

    public async createFlower(flower: Flower): Promise<Flower> {
        let createdFlower = await this.flowerRepository.findOne({
            where: {id: flower.id},
        });
        if(createdFlower) {
            throw new ConflictException(`Flower with id ${flower.id} already exists.`);
        }
        
        createdFlower = (await (
            await this.flowerRepository.insert(flower)
        ).identifiers[0]) as Flower;
        
        try {
            createdFlower = await this.getFlowerById(createdFlower.id);
        } catch(e) {
            throw new NotFoundException(`Flower with id ${createdFlower.id} was not found.`);
        }
        
        return createdFlower;
    }

    public async removeFlower(id: number): Promise<Flower> {
        let deletableFlower;
        try {
            deletableFlower = await this.getFlowerById(id);
        } catch(e) {
            throw new NotFoundException(`Flower with id ${id} was not found.`);
        }
        
        deletableFlower = (await this.flowerRepository.delete({ id }))?.raw;
        return deletableFlower;
    }

}