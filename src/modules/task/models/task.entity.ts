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
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskStatus } from '../enum/taskStatus.enum';
import { User } from '../../auth/models/user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  status: TaskStatus;

  @Column()
  description: string;

  @Column({ name: 'userId' })
  userId: string;

  @ManyToOne((type) => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  dateTimeCreated: Date;

  @UpdateDateColumn()
  dateTimeModified: Date;
}
