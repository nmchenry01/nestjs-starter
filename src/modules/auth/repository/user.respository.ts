import { EntityRepository, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { User } from '../models/user.entity';
import { CreateUserDTO } from '../dto/createUser.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    const { username, password } = createUserDTO;

    const result = await this.hashPassword(password);

    const user = this.create({
      username,
      password: result.hashedPassword,
      salt: result.salt,
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      console.log(typeof error);
    }
  }

  private async hashPassword(
    password: string,
  ): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return { hashedPassword, salt };
  }
}
