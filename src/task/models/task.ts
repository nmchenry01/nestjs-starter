export enum TaskStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  dateTimeCreated: Date;
  dateTimeModified: Date;
}
