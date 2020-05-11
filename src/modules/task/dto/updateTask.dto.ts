import { IsOptional, IsUUID, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../enum/taskStatus.enum';

export class UpdateTaskDTO {
  @IsUUID()
  id: string;

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
