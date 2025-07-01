import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zhanalyq } from './entities/zhanalyq.entity';
import { ZhanalyqtarService } from './zhanalyqtar.service';
import { ZhanalyqtarController } from './zhanalyqtar.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Zhanalyq])],
  controllers: [ZhanalyqtarController],
  providers: [ZhanalyqtarService],
  exports: [ZhanalyqtarService],
})
export class ZhanalyqtarModule {}
