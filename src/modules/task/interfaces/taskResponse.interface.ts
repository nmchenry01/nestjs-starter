import { TaskStatus } from '../enum/taskStatus.enum';

export interface TaskResponse {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  userId: string;
  dateTimeCreated: Date;
  dateTimeModified: Date;
}
