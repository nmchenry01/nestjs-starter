import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './interfaces/createUserResponse.interface';
import { SignInUserDTO } from './dto/signInUser.dto';
import { AccessToken } from './interfaces/accessToken.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body(ValidationPipe) createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponse> {
    return this.authService.createUser(createUserDTO);
  }

  @Post('/signin')
  async signin(
    @Body(ValidationPipe) signInUserDTO: SignInUserDTO,
  ): Promise<AccessToken> {
    return this.authService.signInUser(signInUserDTO);
  }
}
