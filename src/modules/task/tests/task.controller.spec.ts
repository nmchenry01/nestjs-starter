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
import { TaskStatus } from '../enums/taskStatus.enum';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { UpdateTaskDTO } from '../dto/updateTask.dto';

describe('Todo Controller', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  let logger: Logger;
  let mockUser: User;
  let mockTaskId: string;
  let mockFilterTaskDTO: FilterTaskDTO;
  let mockTaskResponse: TaskResponse;
  let mockCreateTaskDTO: CreateTaskDTO;
  let mockUpdateTaskDTO: UpdateTaskDTO;

  beforeEach(async () => {
    mockUser = new User();
    mockTaskId = '123';
    mockFilterTaskDTO = {
      searchTerm: 'test',
    };
    mockTaskResponse = {
      id: '123',
      title: 'mockTitle',
      status: TaskStatus.IN_PROGRESS,
      description: 'mockDescription',
      userId: 'mockUserId',
      dateTimeCreated: new Date('10-10-2000'),
      dateTimeModified: new Date('10-10-2000'),
    };
    mockCreateTaskDTO = {
      title: 'mockTask',
      description: 'mockDescription',
      status: TaskStatus.OPEN,
    };
    mockUpdateTaskDTO = {
      title: 'someTitle',
    };

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
      taskService.getTaskById = jest.fn().mockResolvedValue(mockTaskResponse);

      const response = await taskController.getTask(mockUser, mockTaskId);

      expect(logger.verbose).toHaveBeenCalledTimes(1);
      expect(taskService.getTaskById).toHaveBeenCalledWith(
        mockUser,
        mockTaskId,
      );
      expect(response).toEqual(mockTaskResponse);
    });

    it('should throw a NotFoundExeception when a task is not found', async () => {
      taskService.getTaskById = jest.fn().mockResolvedValue(undefined);

      await expect(() =>
        taskController.getTask(mockUser, mockTaskId),
      ).rejects.toThrowError(`Task with ID ${mockTaskId} not found`);
    });
  });

  describe('createTask', () => {
    it('should call logger.verbose and taskService.createTask with correct inputs', async () => {
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

  describe('deleteTask', () => {
    it('should call logger.verbose and taskService.deleteTaskById with correct inputs', async () => {
      taskService.deleteTaskById = jest.fn().mockResolvedValue(true);

      await taskController.deleteTask(mockUser, mockTaskId);

      expect(logger.verbose).toHaveBeenCalledTimes(1);
      expect(taskService.deleteTaskById).toHaveBeenCalledWith(
        mockUser,
        mockTaskId,
      );
    });

    it('should throw a NotFoundException when the task to delete is not found', async () => {
      taskService.deleteTaskById = jest.fn().mockResolvedValue(false);

      await expect(() =>
        taskController.deleteTask(mockUser, mockTaskId),
      ).rejects.toThrowError(`Task to delete with ID ${mockTaskId} not found`);
    });
  });

  describe('updateTask', () => {
    it('should call logger.verbose and taskService.updateTask with correct inputs', async () => {
      taskService.updateTask = jest.fn().mockResolvedValue(true);

      await taskController.updateTask(mockTaskId, mockUser, mockUpdateTaskDTO);

      expect(logger.verbose).toHaveBeenCalledTimes(1);
      expect(taskService.updateTask).toHaveBeenCalledWith(
        mockTaskId,
        mockUser,
        mockUpdateTaskDTO,
      );
    });

    it('should throw a NotFoundException when the task to updated is not found', async () => {
      taskService.updateTask = jest.fn().mockResolvedValue(undefined);

      await expect(() =>
        taskController.updateTask(mockTaskId, mockUser, mockUpdateTaskDTO),
      ).rejects.toThrowError(`Task to update with ID ${mockTaskId} not found`);
    });
  });
});
