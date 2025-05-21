import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from '@/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };

    console.log('payload:', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    return this.usersService.create(user);
  }
}
