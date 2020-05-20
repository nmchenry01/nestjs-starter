import { Matches, IsNotEmpty, IsString } from 'class-validator';
import { passwordRegex } from './createUser.dto';

export class SignInUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, { message: 'Not a valid password' })
  password: string;
}
