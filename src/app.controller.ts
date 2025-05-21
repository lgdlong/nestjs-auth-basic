import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { LocalAuthGuard } from './common/guards/local-auth.guard';
import { Response } from 'express';
import { AuthenticatedGuard } from './stateful/passport/stateful.local.authenticated.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  // @Get()
  // getHomePage(@Req() req: Request, @Res() res: Response) {
  //   const isAuthenticated = req.isAuthenticated();
  //   return res.render('home', { isAuthenticated });
  // }

  // @Get('/login')
  // async getLoginPage(@Req() req: Request, @Res() res: Response) {
  //   const isAuthenticated = req.isAuthenticated();
  //   if (isAuthenticated) {
  //     return res.redirect('/');
  //   } else return res.render('login');
  // }

  @UseGuards(AuthenticatedGuard)
  @Render('user')
  @Get('/user')
  async getUserPage() {
    const usersList = await this.usersService.findAll();
    return { users: usersList };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    console.log('handleLogin: ', req.user);

    return req.user;
  }

  //tham khảo: https://www.loginradius.com/blog/engineering/guest-post/session-authentication-with-nestjs-and-mongodb/
  //https://www.loginradius.com/blog/engineering/guest-post/session-authentication-with-nestjs-and-mongodb/

  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async handleLoginStateful(@Req() req: Request, @Res() res: Response) {
  //   return res.redirect('/');
  // }

  // @Post('logout')
  // logout(@Req() req: Request, @Res() res: Response) {
  //   /* destroys user session */
  //   req.session.destroy(function (err) {
  //     if (err) console.log(err);
  //     return res.redirect('/');
  //   });
  // }
}
