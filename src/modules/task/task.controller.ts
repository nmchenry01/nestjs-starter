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
import { CreateTaskDTO } from './dto/createTask.dto';
import { TaskService } from './task.service';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { FilterTaskDTO } from './dto/filterTask.dto';
import { GetUser } from '../auth/decorators/getUser.decorator';
import { User } from '../auth/models/user.entity';
import { TaskResponse } from './interfaces/taskResponse.interface';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getTasks(
    @GetUser() user: User,
    @Query() filterTaskDTO: FilterTaskDTO,
  ): Promise<TaskResponse[]> {
    return this.taskService.getTasks(user, filterTaskDTO);
  }

  @Get('/:id')
  async getTask(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<TaskResponse> {
    const response = await this.taskService.getTaskById(user, id);

    if (!response) throw new NotFoundException(`Task with ID ${id} not found`);

    return response;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @GetUser() user: User,
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<TaskResponse> {
    return this.taskService.createTask(user, createTaskDTO);
  }

  @Delete('/:id')
  async deleteTask(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    const taskToDelete = await this.taskService.deleteTaskById(user, id);

    if (!taskToDelete) {
      throw new NotFoundException(`Task to delete with ID ${id} not found`);
    }
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<void> {
    const taskToUpdate = await this.taskService.updateTask(
      id,
      user,
      updateTaskDTO,
    );

    if (!taskToUpdate) {
      throw new NotFoundException(`Task to update with ID ${id} not found`);
    }
  }
}
