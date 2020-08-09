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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TaskService } from './task.service';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { FilterTaskDTO } from './dto/filterTask.dto';
import { GetUser } from '../auth/decorators/getUser.decorator';
import { User } from '../auth/models/user.entity';
import { TaskResponse } from './dto/taskResponse.dto';
import { LoggerContext } from '../logger/enums/loggerContext.enum';
import { LoggerService } from '../logger/logger.service';

@ApiBearerAuth()
@ApiTags('Task')
@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(
    private taskService: TaskService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext(LoggerContext.TASKCONTROLLER);
  }

  @ApiOperation({
    summary: 'Get all tasks',
    description:
      'Fetches all tasks from the database for a given user. Optional filter query parameters',
  })
  @ApiOkResponse({
    description: 'Retrieved list of active tasks successfully',
    type: [TaskResponse],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  @UsePipes(ValidationPipe)
  async getTasks(
    @GetUser() user: User,
    @Query() filterTaskDTO: FilterTaskDTO,
  ): Promise<TaskResponse[]> {
    this.loggerService.verbose(
      `Get Tasks request received from ${user.username}: ${JSON.stringify(
        filterTaskDTO,
      )}`,
    );
    return this.taskService.getTasks(user, filterTaskDTO);
  }

  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Fetches task by ID',
  })
  @ApiNotFoundResponse({
    description: 'Task with ID not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOkResponse({
    description: 'Retrieved task successfully',
    type: TaskResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('/:id')
  async getTask(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<TaskResponse> {
    this.loggerService.verbose(
      `Get Task By ID request received from ${user.username}: Task ID ${id}`,
    );

    const response = await this.taskService.getTaskById(user, id);

    if (!response) throw new NotFoundException(`Task with ID ${id} not found`);

    return response;
  }

  @ApiOperation({
    summary: 'Create task',
    description: 'Create a task with a body',
  })
  @ApiCreatedResponse({
    description: 'Task created successfully',
    type: TaskResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @GetUser() user: User,
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<TaskResponse> {
    this.loggerService.verbose(
      `Create Task request received from ${user.username}: ${JSON.stringify(
        createTaskDTO,
      )}`,
    );

    return this.taskService.createTask(user, createTaskDTO);
  }

  @ApiOperation({
    summary: 'Delete a task',
    description: 'Delete a task with a given ID',
  })
  @ApiOkResponse({
    description: 'Task deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({
    description: 'Task to delete with ID not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteTask(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    this.loggerService.verbose(
      `Delete Task request from ${user.username}: Task ID ${id}`,
    );

    const taskToDelete = await this.taskService.deleteTaskById(user, id);

    if (!taskToDelete) {
      throw new NotFoundException(`Task to delete with ID ${id} not found`);
    }
  }

  @ApiOperation({
    summary: 'Update a task',
    description: 'Update a task with a given ID',
  })
  @ApiOkResponse({
    description: 'Task updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({
    description: 'Task to update with ID not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<void> {
    this.loggerService.verbose(
      `Update Task request from ${
        user.username
      }: Task ID ${id} ${JSON.stringify(updateTaskDTO)}`,
    );

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
