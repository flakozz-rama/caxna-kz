import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Configuration
import configuration from './config/configuration';

// Entities
import { User } from './users/entities/user.entity';
import { Article } from './articles/entities/article.entity';
import { Video } from './videos/entities/video.entity';
import { Interview } from './interviews/entities/interview.entity';
import { Zhanalyq } from './zhanalyqtar/entities/zhanalyq.entity';
import { ArnaiyZhobala } from './arnaiy-zhobalar/entities/arnaiy-zhobala.entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { VideosModule } from './videos/videos.module';
import { InterviewsModule } from './interviews/interviews.module';
import { ZhanalyqtarModule } from './zhanalyqtar/zhanalyqtar.module';
import { ArnaiyZhobalarModule } from './arnaiy-zhobalar/arnaiy-zhobalar.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [User, Article, Video, Interview, Zhanalyq, ArnaiyZhobala],
        synchronize: configService.get('nodeEnv') === 'development',
        logging: configService.get('nodeEnv') === 'development',
      }),
      inject: [ConfigService],
    }),

    // Static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    ArticlesModule,
    VideosModule,
    InterviewsModule,
    ZhanalyqtarModule,
    ArnaiyZhobalarModule,
    UploadsModule,
  ],
})
export class AppModule {}
