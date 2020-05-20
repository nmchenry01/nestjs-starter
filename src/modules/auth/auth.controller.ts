import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './interfaces/createUserResponse';
import { SignInUserDTO } from './dto/signInUser.dto';

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
  ): Promise<void> {
    return this.authService.signInUser(signInUserDTO);
  }
}
