import { Repository, EntityRepository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Task } from '../models/task.entity';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { FilterTaskDTO } from '../dto/filterTask.dto';
import { User } from '../../auth/models/user.entity';
import { TaskResponse } from '../interfaces/taskResponse.interface';
import { LoggerContext } from '../../../enums/loggerContext.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger(LoggerContext.TASKREPOSITORY);

  async createTask(
    user: User,
    createTaskDTO: CreateTaskDTO,
  ): Promise<TaskResponse> {
    const partialTask = this.create(createTaskDTO);

    partialTask.user = user;

    try {
      const task = await this.save(partialTask);

      this.logger.verbose(`Successfully created task with ID: ${task.id}`);

      return this.buildTaskResponse(task);
    } catch (error) {
      this.logger.error(
        `Failed to save task to DB: ${error.stack} : ${JSON.stringify(
          createTaskDTO,
        )}`,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTasks(
    user: User,
    filterTaskDTO: FilterTaskDTO,
  ): Promise<TaskResponse[]> {
    const { status, searchTerm } = filterTaskDTO;

    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

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

  buildTaskResponse(task: Task): TaskResponse {
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
