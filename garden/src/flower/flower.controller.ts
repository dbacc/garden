import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query
} from '@nestjs/common';
import { FlowerService } from './flower.service';
import { Flower } from './flower.entity';

@Controller('flower')
export class FlowerController {
    
    constructor(private flowerService: FlowerService){}

    @Get()
    async getAllFlowersByColor(@Query('color') color: string) {
        const flower = await this.flowerService.getFlowersByColor(color);
        return flower;
    }

    @Get(':id')
    async getFlower(@Param('id') id) {
        const flower = await this.flowerService.getFlowerById(id);
        return flower;
    }

    @Post()
    async addFlower(@Body() flower: Flower) {
        const addedFlower = await this.flowerService.createFlower(flower);
        return addedFlower;
    }

    @Delete(':id')
    async deleteFlower(@Param('id') id: number) {
        const flower = await this.flowerService.removeFlower(id);
        return flower;
    }

}