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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './models/task.entity';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TaskService } from './task.service';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { FilterTaskDTO } from './dto/filterTask.dto';
import { GetUser } from '../auth/decorators/getUser.decorator';
import { User } from '../auth/models/user.entity';
import { CreateTaskResponse } from './interfaces/createTaskResponse.interface';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getTasks(@Query() filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
    return this.taskService.getTasks(filterTaskDTO);
  }

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
  async createTask(
    @GetUser() user: User,
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<CreateTaskResponse> {
    return this.taskService.createTask(user, createTaskDTO);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    const taskToDelete = await this.taskService.deleteTaskById(id);

    if (!taskToDelete) {
      throw new NotFoundException(`Task to delete with ID ${id} not found`);
    }
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<void> {
    const taskToUpdate = await this.taskService.updateTask(id, updateTaskDTO);

    if (!taskToUpdate) {
      throw new NotFoundException(`Task to update with ID ${id} not found`);
    }
  }
}
