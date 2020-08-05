import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/createTask.dto';
import { Task } from './models/task.entity';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { FilterTaskDTO } from './dto/filterTask.dto';
import { TaskRepository } from './repository/task.repository';
import { User } from '../auth/models/user.entity';
import { TaskResponse } from './interfaces/taskResponse.interface';
import { LoggerContext } from '../logger/enums/loggerContext.enum';
import { ITaskService } from './interfaces/taskService.interface';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: TaskRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext(LoggerContext.TASKSERVICE);
  }

  async getTasks(
    user: User,
    filterTaskDTO: FilterTaskDTO,
  ): Promise<TaskResponse[]> {
    return this.taskRepository.getTasks(user, filterTaskDTO);
  }

  async getTaskById(user: User, id: string): Promise<TaskResponse> {
    const task = await this.taskRepository.findOne({ where: { id, user } });

    if (!task) {
      this.loggerService.log(`Task with ID ${id} not found`);
      return undefined;
    }

    return this.taskRepository.buildTaskResponse(task);
  }

  async createTask(
    user: User,
    createTaskDTO: CreateTaskDTO,
  ): Promise<TaskResponse> {
    return this.taskRepository.createTask(user, createTaskDTO);
  }

  async deleteTaskById(user: User, id: string): Promise<boolean> {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result && result.affected === 1) return true;

    if (result && result.affected !== 1) {
      this.loggerService.warn(
        `Unexpected number of rows affected by delete operation: ${JSON.stringify(
          result,
        )}`,
      );
      return false;
    }

    this.loggerService.log(`Task to delete with ID ${id} not found`);

    return false;
  }

  async updateTask(
    id: string,
    user: User,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<boolean> {
    const task = await this.getTaskById(user, id);

    if (!task) return false;

    const result = await this.taskRepository.update(id, updateTaskDTO);

    if (result && result.affected === 1) return true;

    if (result && result.affected !== 1)
      this.loggerService.warn(
        `Unexpected number of rows affected by update operation: ${JSON.stringify(
          result,
        )}`,
      );

    this.loggerService.log(`Task to update with ID ${id} not found`);

    return false;
  }
}
