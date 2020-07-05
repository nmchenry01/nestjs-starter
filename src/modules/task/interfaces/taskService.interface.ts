import { TaskResponse } from './taskResponse.interface';
import { FilterTaskDTO } from '../dto/filterTask.dto';
import { User } from '../../auth/models/user.entity';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { UpdateTaskDTO } from '../dto/updateTask.dto';

export interface ITaskService {
  getTasks(user: User, filterTaskDTO: FilterTaskDTO): Promise<TaskResponse[]>;
  getTaskById(user: User, id: string): Promise<TaskResponse>;
  createTask(user: User, createTaskDTO: CreateTaskDTO): Promise<TaskResponse>;
  deleteTaskById(user: User, id: string): Promise<boolean>;
  updateTask(
    id: string,
    user: User,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<boolean>;
}
