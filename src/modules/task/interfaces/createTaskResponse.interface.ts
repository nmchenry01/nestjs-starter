import { TaskStatus } from '../enum/taskStatus.enum';

export interface CreateTaskResponse {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  userId: string;
  dateTimeCreated: Date;
  dateTimeModified: Date;
}
