import { TaskStatus } from '../enums/taskStatus.enum';

export class TaskResponse {
  id: string;

  title: string;

  status: TaskStatus;

  description: string;

  userId: string;

  dateTimeCreated: Date;

  dateTimeModified: Date;
}
