import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './dto/createUserResponse.dto';
import { SignInUserDTO } from './dto/signInUser.dto';
import { AccessToken } from './dto/accessToken.dto';
import { LoggerContext } from '../logger/enums/loggerContext.enum';
import { LoggerService } from '../logger/logger.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext(LoggerContext.AUTHCONTROLLER);
  }

  @ApiOperation({
    summary: 'User sign up',
    description: 'Sign up a new user with username and password',
  })
  @ApiCreatedResponse({
    description: 'User signed up successfully',
    type: CreateUserResponse,
  })
  @ApiConflictResponse({
    description: 'User credentials already exist',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('/signup')
  async signup(
    @Body(ValidationPipe) createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponse> {
    this.loggerService.verbose(
      `Create User request received: ${JSON.stringify(createUserDTO)}`,
    );

    return this.authService.createUser(createUserDTO);
  }

  @ApiOperation({
    summary: 'User sign in',
    description: 'Sign in an existing user with username and password',
  })
  @ApiCreatedResponse({
    description: 'User signed in successfully',
    type: AccessToken,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Passwords do not match',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
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
