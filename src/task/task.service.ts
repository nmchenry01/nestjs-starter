import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/task.dto';
import { Task } from './models/task';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  findAllTasks(): Task[] {
    return this.tasks;
  }

  findTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      dateTimeCreated: new Date(),
      dateTimeModified: new Date(),
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): Task | undefined {
    const taskToDelete = this.tasks.find((task) => task.id === id);

    if (!taskToDelete) {
      return undefined;
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);

    return taskToDelete;
  }
}
