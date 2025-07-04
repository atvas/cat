import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { customAlphabet } from 'nanoid';
import { RegisterDto } from './dto/register.dto';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,private jwt:JwtService) {}
  private readonly userSelect : Prisma.UserSelect = {
    userId : true,
    email : true,
    name : true,
  }

  /**
   * 用户注册
   * @param data
   */
  async register(data: RegisterDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (user) {
      throw new NotFoundException('用戶已存在');
    }
    const nanoid = customAlphabet('0123456789',8)
    const id = nanoid();
    return  this.prisma.user.create({
      data:{
        ...data,
        userId: id
      },
      select: this.userSelect
    })
  }

  /**
   * 验证用户
   * @param email
   * @param password
   */
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.password);
    return passwordMatches ? user : null;
  }


  /**
   * 登录
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    const user = await this.validateUser(email,password)
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const tokens = await this.generateTokens(user.userId,user.email)
    await this.storeRefreshToken(user.userId,tokens.refresh_token)
    return tokens;
  }


  /**
   * 生成token
   * @param userId
   * @param email
   */
  async generateTokens(userId:string,email:string){
    const payload = {sub:userId,email};

    const [access_token,refresh_token] = await  Promise.all([
      this.jwt.signAsync(payload,{
        secret:process.env.JWT_SECRET,
        expiresIn: '15m'
      }),
      this.jwt.signAsync(payload,{
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      })
    ])
    return { access_token, refresh_token };
  }


  /**
   * 儲存刷新token
   * @param userId
   * @param token
   */
  async storeRefreshToken(userId: string, token: string) {
    const hashed = await bcrypt.hash(token, 10);
    await this.prisma.user.update({
      where: { userId: userId },
      data: { refreshToken: hashed },
    });
  }

  /**
   * 刷新token
   * @param token
   */
  async refreshTokens(token:string){
    if (!token) throw new ForbiddenException('Invalid token');
    const payload = await this.jwt.verifyAsync(token,{
      secret: process.env.JWT_REFRESH_SECRET,
    })

    const user = await this.prisma.user.findUnique({ where: { email: payload.email } })
    if (!user?.refreshToken) throw new ForbiddenException('Invalid token');
    const tokens = await this.generateTokens(user.userId,user.email)
    await this.storeRefreshToken(user.userId,tokens.refresh_token)
    return tokens;
  }

  /**
   * 退出登录
   * @param userId
   */
  async logout(userId:string) {
    await this.prisma.user.update({
      where : {userId: userId},
      data:{
        refreshToken : null
      }
    })
  }
}
