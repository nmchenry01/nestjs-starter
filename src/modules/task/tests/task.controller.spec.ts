import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { TaskController } from '../task.controller';
import { TaskServiceMock } from './mocks/taskService.mock';
import { TaskRepository } from '../repository/task.repository';
import { TaskService } from '../task.service';
import { mockGuard } from './mocks/authGuard.mock';

describe('Todo Controller', () => {
  let taskController: TaskController;

  beforeEach(async () => {
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

    taskController = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });
});
