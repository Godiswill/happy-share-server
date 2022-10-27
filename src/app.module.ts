// The root module of the application.
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PostsEntity } from './posts/posts.entity';
import { PostsModule } from './posts/posts.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IDataBaseEnv>) => {
        return {
          type: 'mysql', // 数据库类型
          autoLoadEntities: true,
          // entities: [PostsEntity], // 数据库实例
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWD'),
          database: configService.get('DB_DATABASE'),
          timezone: '+08:00', // 服务器上配置的时区
          synchronize: true, // 不要用于生产环境，会丢失数据
        };
      },
    }),
    PostsModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
