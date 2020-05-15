import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../models/task.entity';
import { CreateTaskDTO } from '../dto/createTask.dto';
import { FilterTaskDTO } from '../dto/filterTask.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const partialTask = this.create(createTaskDTO);

    const task = await this.save(partialTask);

    return task;
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
}
