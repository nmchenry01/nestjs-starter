// export interface Task {
//   id: string;
//   title: string;
//   status: TaskStatus;
//   description: string;
//   dateTimeCreated: Date;
//   dateTimeModified: Date;
// }

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from '../enum/taskStatus.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;

  @Column()
  description: string;

  @CreateDateColumn()
  dateTimeCreated: Date;

  @UpdateDateColumn()
  dateTimeModified: Date;
}
