import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './interfaces/createUserResponse.interface';
import { SignInUserDTO } from './dto/signInUser.dto';
import { AccessToken } from './interfaces/accessToken.interface';
import { LoggerContext } from '../logger/enums/loggerContext.enum';
import { LoggerService } from '../logger/logger.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext(LoggerContext.AUTHCONTROLLER);
  }

  @Post('/signup')
  async signup(
    @Body(ValidationPipe) createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponse> {
    this.loggerService.verbose(
      `Create User request received: ${JSON.stringify(createUserDTO)}`,
    );

    return this.authService.createUser(createUserDTO);
  }

  @Post('/signin')
  async signin(
    @Body(ValidationPipe) signInUserDTO: SignInUserDTO,
  ): Promise<AccessToken> {
    this.loggerService.verbose(
      `Sign In request received: ${JSON.stringify(signInUserDTO)}`,
    );

    return this.authService.signInUser(signInUserDTO);
  }
}
