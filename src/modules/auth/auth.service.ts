import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repository/user.respository';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './interfaces/createUserResponse.interface';
import { SignInUserDTO } from './dto/signInUser.dto';
import { AccessToken } from './interfaces/accessToken.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserResponse> {
    return this.userRepository.createUser(createUserDTO);
  }

  async signInUser(signInUserDTO: SignInUserDTO): Promise<AccessToken> {
    const jwtPayload = await this.userRepository.signInUser(signInUserDTO);

    const bearerToken = await this.jwtService.signAsync(jwtPayload);

    return { bearerToken };
  }
}
