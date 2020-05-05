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
}
