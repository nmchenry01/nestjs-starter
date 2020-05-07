import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.taskService.findTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }
}
