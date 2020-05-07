import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Task } from './models/task';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TaskService } from './task.service';
import { UpdateTaskDTO } from './dto/updateTask.dto';

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
  @UsePipes(ValidationPipe)
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

  @Patch()
  @UsePipes(ValidationPipe)
  updateTask(@Body() updateTaskDTO: UpdateTaskDTO): Task {
    const taskToUpdate = this.taskService.updateTask(updateTaskDTO);

    if (!taskToUpdate) {
      throw new NotFoundException(
        `Task to update with ID ${updateTaskDTO.id} not found`,
      );
    }

    return taskToUpdate;
  }
}
