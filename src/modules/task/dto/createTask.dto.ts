import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../enum/taskStatus.enum';

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
