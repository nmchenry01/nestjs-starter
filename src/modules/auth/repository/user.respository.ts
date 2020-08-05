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
import { CreateUserResponse } from '../interfaces/createUserResponse.interface';
import { SignInUserDTO } from '../dto/signInUser.dto';
import { JwtPayload } from '../interfaces/jwtPayload.interface';
import { LoggerContext } from '../../logger/enums/loggerContext.enum';
import { LoggerService } from '../../logger/logger.service';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private loggerService = new LoggerService(LoggerContext.USERREPOSITORY);

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

      this.loggerService.log(`User with username ${username} created`);

      return {
        id: user.id,
        username: user.username,
        dateTimeCreated: user.dateTimeCreated,
      };
    } catch (error) {
      if (error.code === '23505') {
        const errorMessage = `User with username ${username} already exists`;
        this.loggerService.error(errorMessage);
        throw new ConflictException(errorMessage);
      } else {
        this.loggerService.error(
          `Failed to created user with username ${username}: ${error.stack}`,
        );
        throw new InternalServerErrorException();
      }
    }
  }

  async signInUser(signInUserDTO: SignInUserDTO): Promise<JwtPayload> {
    const { username, password } = signInUserDTO;

    const user = await this.findOne({ username });

    if (!user) {
      const errorMessage = `User with username ${username} does not exist`;
      this.loggerService.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    const comparePasswordResult = await this.validatePassword(password, user);

    if (!comparePasswordResult) {
      const errorMessage = `Passwords do not match`;
      this.loggerService.error(errorMessage);
      throw new UnauthorizedException(errorMessage);
    }

    return { username: user.username };
  }

  private async hashPassword(
    password: string,
  ): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return { hashedPassword, salt };
  }

  private async validatePassword(
    inputPassword: string,
    user: User,
  ): Promise<boolean> {
    const inputPasswordHash = await hash(inputPassword, user.salt);

    if (inputPasswordHash === user.password) return true;

    return false;
  }
}
