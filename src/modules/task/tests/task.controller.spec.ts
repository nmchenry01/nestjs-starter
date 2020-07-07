import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';
import { TaskController } from '../task.controller';
import { TaskServiceMock } from './mocks/taskService.mock';
import { TaskRepository } from '../repository/task.repository';
import { TaskService } from '../task.service';
import { mockGuard } from './mocks/authGuard.mock';
import { User } from '../../auth/models/user.entity';
import { FilterTaskDTO } from '../dto/filterTask.dto';
import { TaskResponse } from '../interfaces/taskResponse.interface';
import { Task } from '../models/task.entity';
import { TaskStatus } from '../enums/taskStatus.enum';
import { CreateTaskDTO } from '../dto/createTask.dto';

describe('Todo Controller', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  let logger: Logger;

  beforeEach(async () => {
    const mockLogger = new Logger();
    mockLogger.debug = jest.fn();
    mockLogger.error = jest.fn();
    mockLogger.log = jest.fn();
    mockLogger.verbose = jest.fn();
    mockLogger.warn = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: TaskService, useClass: TaskServiceMock },
        TaskRepository,
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockGuard)
      .compile();

    module.useLogger(mockLogger);

    logger = mockLogger;
    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  describe('getTasks', () => {
    it('should call logger.verbose and taskService.getTasks with correct inputs', async () => {
      const mockUser = new User();

      const mockFilterTaskDTO: FilterTaskDTO = {
        searchTerm: 'test',
      };

      taskService.getTasks = jest.fn();

      await taskController.getTasks(mockUser, mockFilterTaskDTO);

      expect(logger.verbose).toHaveBeenCalledTimes(1);
      expect(taskService.getTasks).toHaveBeenCalledWith(
        mockUser,
        mockFilterTaskDTO,
      );
    });
  });

  describe('getTask', () => {
    it('should call logger.verbose and taskService.getTaskById with correct inputs', async () => {
      const mockUser = new User();

      const mockId = '123';

      const mockTaskResponse: TaskResponse = {
        id: '123',
        title: 'mockTitle',
        status: TaskStatus.IN_PROGRESS,
        description: 'mockDescription',
        userId: 'mockUserId',
        dateTimeCreated: new Date('10-10-2000'),
        dateTimeModified: new Date('10-10-2000'),
      };

      taskService.getTaskById = jest.fn().mockResolvedValue(mockTaskResponse);

      const response = await taskController.getTask(mockUser, mockId);

      expect(logger.verbose).toHaveBeenCalledTimes(1);
      expect(taskService.getTaskById).toHaveBeenCalledWith(mockUser, mockId);
      expect(response).toEqual(mockTaskResponse);
    });

    it('should throw a NotFoundExeception when a task is not found', async () => {
      const mockUser = new User();

      const mockId = '123';

      taskService.getTaskById = jest.fn().mockResolvedValue(undefined);

      await expect(() =>
        taskController.getTask(mockUser, mockId),
      ).rejects.toThrowError(`Task with ID ${mockId} not found`);
    });
  });

  describe('createTask', () => {
    it('should call logger.verbose and taskService.createTask with correct inputs', async () => {
      const mockUser = new User();

      const mockCreateTaskDTO: CreateTaskDTO = {
        title: 'mockTask',
        description: 'mockDescription',
        status: TaskStatus.OPEN,
      };

      const mockTaskResponse: TaskResponse = {
        id: '123',
        title: 'mockTask',
        status: TaskStatus.OPEN,
        description: 'mockDescription',
        userId: 'mockUserId',
        dateTimeCreated: new Date('10-10-2000'),
        dateTimeModified: new Date('10-10-2000'),
      };

      taskService.createTask = jest.fn().mockResolvedValue(mockTaskResponse);

      const response = await taskController.createTask(
        mockUser,
        mockCreateTaskDTO,
      );

      expect(logger.verbose).toHaveBeenCalledTimes(1);
      expect(taskService.createTask).toHaveBeenCalledWith(
        mockUser,
        mockCreateTaskDTO,
      );
      expect(response).toEqual(mockTaskResponse);
    });
  });
});
