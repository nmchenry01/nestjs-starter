import { EntityRepository, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../models/user.entity';
import { CreateUserDTO } from '../dto/createUser.dto';
import { CreateUserResponse } from '../interfaces/createUserResponse';
import { SignInUserDTO } from '../dto/signInUser.dto';

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

  async signInUser(signInUserDTO: SignInUserDTO): Promise<void> {
    const { username, password } = signInUserDTO;

    const user = await this.findOne({ username });

    if (!user) {
      throw new NotFoundException(
        `User with username ${username} does not exist`,
      );
    }

    const comparePasswordResult = await this.comparePassword(password, user);

    if (!comparePasswordResult) {
      throw new UnauthorizedException(`Passwords do not match`);
    }
  }

  private async hashPassword(
    password: string,
  ): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return { hashedPassword, salt };
  }

  private async comparePassword(
    inputPassword: string,
    user: User,
  ): Promise<boolean> {
    const inputPasswordHash = await hash(inputPassword, user.salt);

    if (inputPasswordHash === user.password) return true;

    return false;
  }
}
