import { UsersService } from '@/users/users.service';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //   @Post('register')
  //   async register(@Body() dto: RegisterDto) {
  //     return this.authService.register(dto);
  //   }
}
