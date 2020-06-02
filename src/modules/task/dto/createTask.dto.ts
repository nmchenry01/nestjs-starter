import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../enums/taskStatus.enum';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsIn([...Object.values(TaskStatus)])
  status: TaskStatus;
}
