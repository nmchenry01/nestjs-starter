import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { CreateUserResponse } from './interfaces/createUserResponse';

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
  async signin(): Promise<void> {
    throw Error('Not implemented');
  }
}
