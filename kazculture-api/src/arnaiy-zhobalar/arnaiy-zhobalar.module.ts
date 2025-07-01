import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArnaiyZhobala } from './entities/arnaiy-zhobala.entity';
import { ArnaiyZhobalarService } from './arnaiy-zhobalar.service';
import { ArnaiyZhobalarController } from './arnaiy-zhobalar.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArnaiyZhobala])],
  controllers: [ArnaiyZhobalarController],
  providers: [ArnaiyZhobalarService],
  exports: [ArnaiyZhobalarService],
})
export class ArnaiyZhobalarModule {}
