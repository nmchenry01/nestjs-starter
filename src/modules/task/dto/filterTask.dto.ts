import { IsString, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from '../enum/taskStatus.enum';

export class FilterTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsIn([...Object.values(TaskStatus)])
  status?: TaskStatus;
}
