import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './modules/task/task.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './config/configuration';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TaskModule,
    AuthModule,
    LoggerModule,
  ],
})
export class AppModule {}
