import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.respository';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    return this.userRepository.createUser(createUserDTO);
  }
}
