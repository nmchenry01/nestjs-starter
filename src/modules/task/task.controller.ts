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
  Query,
} from '@nestjs/common';
import { Task } from './models/task.entity';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TaskService } from './task.service';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { FilterTaskDTO } from './dto/filterTask.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  // @Get()
  // @UsePipes(ValidationPipe)
  // getTasks(@Query() filterTaskDTO: FilterTaskDTO): Task[] {
  //   if (Object.keys(filterTaskDTO).length === 0) {
  //     return this.taskService.findAllTasks();
  //   }

  //   return this.taskService.findTasks(filterTaskDTO);
  // }

  @Get('/:id')
  async getTask(@Param('id') id: string): Promise<Task> {
    const task = await this.taskService.findTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    const taskToDelete = await this.taskService.deleteTaskById(id);

    if (!taskToDelete) {
      throw new NotFoundException(`Task to delete with ID ${id} not found`);
    }
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
