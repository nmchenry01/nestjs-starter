import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../models/task.entity';
import { CreateTaskDTO } from '../dto/createTask.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const partialTask = this.create(createTaskDTO);

    const task = await this.save(partialTask);

    return task;
  }
}
