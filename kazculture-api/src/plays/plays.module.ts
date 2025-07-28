import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaysService } from './plays.service';
import { PlaysController } from './plays.controller';
import { Play } from './entities/play.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Play])],
  controllers: [PlaysController],
  providers: [PlaysService],
  exports: [PlaysService],
})
export class PlaysModule {} 