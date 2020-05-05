import { Module } from '@nestjs/common';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
