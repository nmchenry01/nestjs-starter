import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './repository/task.repository';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
    LoggerModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
