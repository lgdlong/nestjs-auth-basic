import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from '@/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, inp_password: string): Promise<User> {
    const user = await this.usersService.findByEmail(username);
    if (
      user &&
      this.usersService.comparePassword(inp_password, user.password)
    ) {
      return user;
    }
    return null;
  }

  async register(user: any) {
    return this.usersService.create(user);
  }
}
