import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowerModule } from './flower/flower.module';

@Module({
  imports: [FlowerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
