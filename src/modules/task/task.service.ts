import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/createTask.dto';
import { Task } from './models/task.entity';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { FilterTaskDTO } from './dto/filterTask.dto';
import { TaskRepository } from './repository/task.repository';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: TaskRepository) {}

  async getTasks(filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTaskDTO);
  }

  async findTaskById(id: string): Promise<Task> {
    return this.taskRepository.findOne({ id });
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  async deleteTaskById(id: string): Promise<boolean> {
    const result = await this.taskRepository.delete({ id });

    if (result.affected === 1) return true;

    return false;
  }

  async updateTask(id: string, updateTaskDTO: UpdateTaskDTO): Promise<boolean> {
    const task = await this.findTaskById(id);

    if (!task) return false;

    const result = await this.taskRepository.update(id, updateTaskDTO);

    if (result.affected === 1) return true;

    return false;
  }
}
