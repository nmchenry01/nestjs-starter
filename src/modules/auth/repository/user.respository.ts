import { EntityRepository, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../models/user.entity';
import { CreateUserDTO } from '../dto/createUser.dto';
import { CreateUserResponse } from '../interfaces/createUserResponse';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserResponse> {
    const { username, password } = createUserDTO;

    const result = await this.hashPassword(password);

    const partialUser = this.create({
      username,
      password: result.hashedPassword,
      salt: result.salt,
    });

    try {
      const user = await partialUser.save();

      return {
        id: user.id,
        username: user.username,
        dateTimeCreated: user.dateTimeCreated,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `User with username ${username} already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(
    password: string,
  ): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return { hashedPassword, salt };
  }
}
