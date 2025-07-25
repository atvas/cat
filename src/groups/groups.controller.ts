import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload, User } from '../auth/user.decorator';
import { CreateGroupsDto } from './dto/create-groups.dto';
import { GroupMemberRole } from '@prisma/client';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  /**
   * 创建群组
   * @param user
   * @param createDto
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@User() user: JwtPayload,@Body() createDto: CreateGroupsDto){
    const group = await this.groupService.create(createDto);
    await this.groupService.addMembersToGroup(group.id,user.userId,GroupMemberRole.ADMIN)
    return this.groupService.findGroupById(group.id)
  }

  /**
   * 查询群组信息
   * @param groupId
   * @param user
   */
  @UseGuards(JwtAuthGuard)
  @Get(':groupId')
  async findOne(@Param('groupId') groupId:string,@User() user:JwtPayload){
    return this.groupService.findGroupById(groupId,user.userId)
  }

  /**
   * 加入群组
   * @param groupId
   * @param user
   */
  @UseGuards(JwtAuthGuard)
  @Post(':groupId/members')
  async addGroupMember(@Param('groupId') groupId:string,@User() user:JwtPayload){
    return this.groupService.addMembersToGroup(groupId,user.userId)
  }

}
