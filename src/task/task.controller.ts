import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
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
    const task = this.taskService.findTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task {
    const taskToDelete = this.taskService.deleteTaskById(id);

    if (!taskToDelete) {
      throw new NotFoundException(`Task to delete with ID ${id} not found`);
    }

    return taskToDelete;
  }
}
