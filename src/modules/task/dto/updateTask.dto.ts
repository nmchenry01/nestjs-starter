import { IsOptional, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../enum/taskStatus.enum';

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn([...Object.values(TaskStatus)])
  status?: TaskStatus;
}
