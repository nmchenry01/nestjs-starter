import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    return this.authService.createUser(createUserDTO);
  }

  @Post('/signin')
  async signin(): Promise<void> {
    throw Error('Not implemented');
  }
}
