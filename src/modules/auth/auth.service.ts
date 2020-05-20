import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.respository';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './interfaces/createUserResponse';
import { SignInUserDTO } from './dto/signInUser.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserResponse> {
    return this.userRepository.createUser(createUserDTO);
  }

  async signInUser(signInUserDTO: SignInUserDTO): Promise<void> {
    return this.userRepository.signInUser(signInUserDTO);
  }
}
