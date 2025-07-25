import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response as ExpressResponse ,Request} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 注册
   * @param dto
   */
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const data = await this.authService.register({
      ...dto,
      password: hashedPassword,
    })
    return {
      data,
      msg: "注册成功"
    }
  }


  /**
   * 登录
   * @param dto
   * @param res
   */
  @Post('login')
  async login(@Body() dto: LoginDto,@Res({passthrough:true}) res : ExpressResponse) {
    const tokens = await this.authService.login(dto.email, dto.password);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {
      access_token: tokens.access_token
    }
  }

  /**
   * 刷新token
   * @param req
   * @param res
   */
  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: ExpressResponse) {
    const refresh_token = req.cookies['refresh_token'];
    const tokens = await this.authService.refreshTokens(refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { access_token: tokens.access_token };
  }

  /**
   * 退出登录
   * @param req
   * @param res
   */
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: ExpressResponse) {
    const token = req.cookies['refresh_token'];
    if (token) {
      try {
        const payload = this.authService['jwt'].decode(token) as any;
        await this.authService.logout(payload.sub);
      } catch {}
    }
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }
}

