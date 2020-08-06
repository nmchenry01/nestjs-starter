import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.respository';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './dto/createUserResponse.dto';
import { SignInUserDTO } from './dto/signInUser.dto';
import { AccessToken } from './dto/accessToken.dto';
import { User } from './models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
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
