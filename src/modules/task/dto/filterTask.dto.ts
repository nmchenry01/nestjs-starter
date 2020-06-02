import { IsString, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from '../enums/taskStatus.enum';

export class FilterTaskDTO {
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsIn([...Object.values(TaskStatus)])
  status?: TaskStatus;
}
