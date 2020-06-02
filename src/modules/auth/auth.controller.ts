import { Controller, Post, Body, ValidationPipe, Logger } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './interfaces/createUserResponse.interface';
import { SignInUserDTO } from './dto/signInUser.dto';
import { AccessToken } from './interfaces/accessToken.interface';
import { LoggerContext } from '../../enum/loggerContext.enum';

@Controller('auth')
export class AuthController {
  private logger = new Logger(LoggerContext.AUTHCONTROLLER);

  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body(ValidationPipe) createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponse> {
    this.logger.verbose(
      `Create User request recieved: ${JSON.stringify(createUserDTO)}`,
    );

    return this.authService.createUser(createUserDTO);
  }

  @Post('/signin')
  async signin(
    @Body(ValidationPipe) signInUserDTO: SignInUserDTO,
  ): Promise<AccessToken> {
    this.logger.verbose(
      `Sign In request recieved: ${JSON.stringify(signInUserDTO)}`,
    );

    return this.authService.signInUser(signInUserDTO);
  }
}
