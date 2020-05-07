import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/createTask.dto';
import { Task, TaskStatus } from './models/task';
import { UpdateTaskDTO } from './dto/updateTask.dto';

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
      status: TaskStatus.OPEN,
      description,
      dateTimeCreated: new Date(),
      dateTimeModified: new Date(),
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): Task | undefined {
    const taskToDelete = this.findTaskById(id);

    if (!taskToDelete) {
      return undefined;
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);

    return taskToDelete;
  }

  updateTask(updateTaskDTO: UpdateTaskDTO): Task | undefined {
    const taskToUpdate = this.findTaskById(updateTaskDTO.title);

    if (!taskToUpdate) {
      return undefined;
    }

    taskToUpdate.title = updateTaskDTO.title
      ? updateTaskDTO.title
      : taskToUpdate.title;

    taskToUpdate.description = updateTaskDTO.description
      ? updateTaskDTO.description
      : taskToUpdate.description;

    taskToUpdate.status = updateTaskDTO.status
      ? updateTaskDTO.status
      : taskToUpdate.status;

    taskToUpdate.dateTimeModified = new Date();

    return taskToUpdate;
  }
}
