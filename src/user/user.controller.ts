import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload, User } from '../auth/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() data: UpdateUserDto,@User() user: JwtPayload) {
    return this.userService.update(user.userId,data)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@User() user: JwtPayload ) {
    return this.userService.findOne(user.userId);
  }
}