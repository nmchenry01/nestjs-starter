import { IsString, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from '../enum/taskStatus.enum';

export class FilterTaskDTO {
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsIn([...Object.values(TaskStatus)])
  status?: TaskStatus;
}
