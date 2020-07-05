import { ITaskService } from '../../interfaces/taskService.interface';
import { User } from '../../../auth/models/user.entity';
import { FilterTaskDTO } from '../../dto/filterTask.dto';
import { CreateTaskDTO } from '../../dto/createTask.dto';
import { UpdateTaskDTO } from '../../dto/updateTask.dto';
import { TaskResponse } from '../../interfaces/taskResponse.interface';
import { TaskStatus } from '../../enums/taskStatus.enum';

export class TaskServiceMock implements ITaskService {
  private mockTaskResponse: TaskResponse = {
    id: 'mockId',
    title: 'mockTitle',
    status: TaskStatus.OPEN,
    description: 'mockDescription',
    userId: 'mockUserId',
    dateTimeCreated: new Date('10-10-2000'),
    dateTimeModified: new Date('10-10-2000'),
  };

  getTasks(user: User, filterTaskDTO: FilterTaskDTO): Promise<TaskResponse[]> {
    return new Promise((resolve) => resolve([this.mockTaskResponse]));
  }

  getTaskById(user: User, id: string): Promise<TaskResponse> {
    const mockResponse: TaskResponse = { ...this.mockTaskResponse, id };
    return new Promise((resolve) => resolve(mockResponse));
  }

  createTask(user: User, createTaskDTO: CreateTaskDTO): Promise<TaskResponse> {
    const mockResponse = { ...this.mockTaskResponse, ...createTaskDTO };
    return new Promise((resolve) => resolve(mockResponse));
  }

  deleteTaskById(user: User, id: string): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }

  updateTask(
    id: string,
    user: User,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }
}
