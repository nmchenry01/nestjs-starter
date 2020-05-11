import { IsString, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from '../models/task';

export class FilterTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsIn([...Object.values(TaskStatus)])
  status?: TaskStatus;
}
