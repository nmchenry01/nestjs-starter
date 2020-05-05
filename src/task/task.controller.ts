import { Controller, Get, Post, Body } from '@nestjs/common';
import { Task } from './models/task';
import { CreateTaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(): Task[] {
    return this.taskService.findAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }
}
