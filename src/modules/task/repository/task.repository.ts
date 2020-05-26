import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../models/task.entity';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { FilterTaskDTO } from '../dto/filterTask.dto';
import { User } from '../../auth/models/user.entity';
import { CreateTaskResponse } from '../interfaces/createTaskResponse.interface';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(
    user: User,
    createTaskDTO: CreateTaskDTO,
  ): Promise<CreateTaskResponse> {
    const partialTask = this.create(createTaskDTO);

    partialTask.user = user;

    const task = await this.save(partialTask);

    return this.buildCreateTaskResponse(task);
  }

  async getTasks(filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
    const { status, searchTerm } = filterTaskDTO;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (searchTerm) {
      query.andWhere(
        '(task.title LIKE :searchTerm OR task.description LIKE :searchTerm)',
        { searchTerm: `%${searchTerm}%` },
      );
    }

    return query.getMany();
  }

  private buildCreateTaskResponse(task: Task): CreateTaskResponse {
    const {
      id,
      status,
      description,
      title,
      userId,
      dateTimeCreated,
      dateTimeModified,
    } = task;

    return {
      id,
      status,
      description,
      title,
      userId,
      dateTimeCreated,
      dateTimeModified,
    };
  }
}
