export enum TaskStatus {
  OPEN,
  CLOSED,
  IN_PROGRESS,
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  dateTimeCreated: Date;
  dateTimeModified: Date;
}
