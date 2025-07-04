import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


  private readonly userSelect : Prisma.UserSelect = {
    userId : true,
    email : true,
    name : true,
  }

  /**
   * 查询用户信息
   * @param userId
   */
  async findOne(userId: string) {
    const user = await  this.prisma.user.findUnique({where: { userId },select: this.userSelect});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * 更新用户信息
   * @param userId
   * @param data
   */
  async update(userId : string,data:UpdateUserDto) {
    const user = await this.prisma.user.findUnique({where: {userId : userId}});
    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    return this.prisma.user.update({
      where: {
        userId : userId
      },
      data: {
        name: data.name
      },
      select: this.userSelect
    })
  }
}
