import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { FlowerController } from "./flower.controller";
import { flowerProviders } from "./flower.providers";
import { FlowerService } from "./flower.service";

@Module({
    imports: [DatabaseModule],
    controllers: [FlowerController],
    providers: [...flowerProviders, FlowerService],
    exports: [],
})
export class FlowerModule {}