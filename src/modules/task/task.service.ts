import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/createTask.dto';
import { Task } from './models/task.entity';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { FilterTaskDTO } from './dto/filterTask.dto';
import { TaskRepository } from './repository/task.repository';
import { User } from '../auth/models/user.entity';
import { TaskResponse } from './interfaces/taskResponse.interface';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: TaskRepository) {}

  async getTasks(
    user: User,
    filterTaskDTO: FilterTaskDTO,
  ): Promise<TaskResponse[]> {
    return this.taskRepository.getTasks(user, filterTaskDTO);
  }

  async getTaskById(user: User, id: string): Promise<TaskResponse> {
    const task = await this.taskRepository.findOne({ where: { id, user } });

    if (!task) return undefined;

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

    if (result.affected === 1) return true;

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

    if (result.affected === 1) return true;

    return false;
  }
}
