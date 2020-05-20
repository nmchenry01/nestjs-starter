import { IsString, IsNotEmpty, Matches } from 'class-validator';

// https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
export const passwordRegex = new RegExp(
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,32}$/,
);

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, {
    message: 'Password does not match complexity requirements',
  })
  password: string;
}
