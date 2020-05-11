import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/createTask.dto';
import { Task } from './models/task.entity';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { FilterTaskDTO } from './dto/filterTask.dto';
import { TaskStatus } from './enum/taskStatus.enum';
import { TaskRepository } from './repository/task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  // findAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // findTasks(filterTaskDTO: FilterTaskDTO): Task[] {
  //   // Case for filtering by title
  //   if (!filterTaskDTO.status) {
  //     return this.tasks.filter((task) =>
  //       task.title.toLowerCase().includes(filterTaskDTO.title.toLowerCase()),
  //     );
  //   }
  //   // Case for filtering by status
  //   if (!filterTaskDTO.title) {
  //     return this.tasks.filter((task) => task.status === filterTaskDTO.status);
  //   }
  //   // Case for filtering by both
  //   return this.tasks.filter(
  //     (task) =>
  //       task.title.toLowerCase().includes(filterTaskDTO.title.toLowerCase()) &&
  //       task.status === filterTaskDTO.status,
  //   );
  // }
  async findTaskById(id: string): Promise<Task> {
    return this.taskRepository.findOne({ id });
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  async deleteTaskById(id: string): Promise<boolean> {
    const deleteResult = await this.taskRepository.delete({ id });

    if (deleteResult.affected === 1) return true;

    return false;
  }
  // updateTask(updateTaskDTO: UpdateTaskDTO): Task | undefined {
  //   const task = this.findTaskById(updateTaskDTO.id);
  //   if (!task) {
  //     return undefined;
  //   }
  //   const updatedTask: Task = { ...task, ...updateTaskDTO };
  //   updatedTask.dateTimeModified = new Date();
  //   this.deleteTaskById(task.id);
  //   this.tasks.push(updatedTask);
  //   return updatedTask;
  // }
}
