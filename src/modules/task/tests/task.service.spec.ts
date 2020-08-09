import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { TaskService } from '../task.service';
import { TaskRepository } from '../repository/task.repository';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { TaskResponse } from '../dto/taskResponse.dto';
import { FilterTaskDTO } from '../dto/filterTask.dto';
import { User } from '../../auth/models/user.entity';
import { TaskStatus } from '../enums/taskStatus.enum';
import { LoggerService } from '../../logger/logger.service';

describe('TodoService', () => {
  let taskService: TaskService;
  let taskRespository: TaskRepository;
  let logger: Logger;

  let mockUser: User;
  let mockTaskId: string;
  let mockFilterTaskDTO: FilterTaskDTO;
  let mockTaskResponse: TaskResponse;
  let mockCreateTaskDTO: CreateTaskDTO;

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

    const mockLogger = new Logger();
    mockLogger.debug = jest.fn();
    mockLogger.error = jest.fn();
    mockLogger.log = jest.fn();
    mockLogger.verbose = jest.fn();
    mockLogger.warn = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        TaskRepository,
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compile();

    module.useLogger(mockLogger);

    logger = mockLogger;
    taskService = module.get<TaskService>(TaskService);
    taskRespository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
    expect(taskRespository).toBeDefined();
  });

  describe('getTasks', () => {
    it('should call taskRespository.getTasks with the correct inputs', async () => {
      taskRespository.getTasks = jest.fn().mockResolvedValue(mockTaskResponse);

      const response = await taskService.getTasks(mockUser, mockFilterTaskDTO);

      expect(taskRespository.getTasks).toHaveBeenCalledWith(
        mockUser,
        mockFilterTaskDTO,
      );
      expect(response).toEqual(mockTaskResponse);
    });
  });

  describe('getTaskById', () => {
    it('should call taskRespository.findOne with the correct inputs', async () => {
      taskRespository.findOne = jest.fn().mockResolvedValue(mockTaskResponse);

      const response = await taskService.getTaskById(mockUser, mockTaskId);

      expect(taskRespository.findOne).toHaveBeenCalledWith({
        where: { id: mockTaskId, user: mockUser },
      });
      expect(response).toEqual(mockTaskResponse);
    });

    it('should call logger.log and return undefined when the task is not found', async () => {
      taskRespository.findOne = jest.fn().mockResolvedValue(undefined);

      const response = await taskService.getTaskById(mockUser, mockTaskId);

      expect(logger.log).toHaveBeenCalledTimes(1);
      expect(taskRespository.findOne).toHaveBeenCalledWith({
        where: { id: mockTaskId, user: mockUser },
      });
      expect(response).toBe(undefined);
    });
  });

  describe('createTask', () => {
    it('should call taskRespository.createTask with the correct inputs', async () => {
      taskRespository.createTask = jest
        .fn()
        .mockResolvedValue(mockTaskResponse);

      const response = await taskService.createTask(
        mockUser,
        mockCreateTaskDTO,
      );

      expect(taskRespository.createTask).toHaveBeenCalledWith(
        mockUser,
        mockCreateTaskDTO,
      );
      expect(response).toEqual(mockTaskResponse);
    });
  });

  describe('deleteTaskById', () => {
    it('should call taskRespository.delete with the correct inputs', async () => {
      taskRespository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      const response = await taskService.deleteTaskById(mockUser, mockTaskId);

      expect(taskRespository.delete).toHaveBeenCalledWith({
        id: mockTaskId,
        userId: mockUser.id,
      });
      expect(response).toBe(true);
    });

    it('should call logger.warn and return false when more than one DB row is affected', async () => {
      taskRespository.delete = jest.fn().mockResolvedValue({ affected: 2 });

      const response = await taskService.deleteTaskById(mockUser, mockTaskId);

      expect(taskRespository.delete).toHaveBeenCalledWith({
        id: mockTaskId,
        userId: mockUser.id,
      });
      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(response).toBe(false);
    });

    it('should call logger.log and return false when the task to delete is not found', async () => {
      taskRespository.delete = jest.fn().mockResolvedValue(undefined);

      const response = await taskService.deleteTaskById(mockUser, mockTaskId);

      expect(taskRespository.delete).toHaveBeenCalledWith({
        id: mockTaskId,
        userId: mockUser.id,
      });
      expect(logger.log).toHaveBeenCalledTimes(1);
      expect(response).toBe(false);
    });
  });
});
