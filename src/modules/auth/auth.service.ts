import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.respository';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './interfaces/createUserResponse';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserResponse> {
    return this.userRepository.createUser(createUserDTO);
  }
}
