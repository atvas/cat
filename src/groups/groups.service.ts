import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateGroupsDto } from './dto/create-groups.dto';
import { UserService } from '../user/user.service';
import { GroupMemberRole, Prisma } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService,private readonly userService: UserService) {}

  private readonly userSelect : Prisma.UserSelect = {
    email : true,
    name : true,
  }

  /**
   * 创建群组
   * @param data
   */
  create(data:CreateGroupsDto){
    return this.prisma.group.create({ data })
  }

  /**
   * 根据ID查询群组
   * @param id
   * @param userId
   */
  async findGroupById(id:string,userId?:string){
    const group = await this.prisma.group.findUnique({
      where:{
        id:id,
        ...(userId && {
          members:{
            some:{
              userId:userId
            }
          }
        })
      },
      include: {
        _count: {
          select: {
            members: true, // 计算群组中的成员数量
            groupTransactions: true // 计算群组中的消费记录数量
          }
        }
      }
    })
    if(!group){
      throw new NotFoundException(`Group not found`)
    }
    // 查询群组的全部消费
    const totalAmount = await this.findGroupsTotalAmount(group.id)
    return {
      group,
      totalAmount
    };
  }

  /**
   * 查询群组的全部消费
   * @param groupId
   */
  async findGroupsTotalAmount(groupId:string){
    const totalExpenseResult = await this.prisma.transaction.aggregate({
      where:{
        groupTransaction:{
          groupId:groupId
        }
      },
      _sum:{
        amount:true
      }
    });
    return totalExpenseResult._sum.amount || 0
  }


  /**
   * 查询全部群组
   */
  async findAllGroups(){
    return this.prisma.group.findMany()
  }

  /**
   * 添加用户到群组
   * @param groupId
   * @param userId
   * @param role
   */
  async addMembersToGroup(groupId:string,userId:string,role: GroupMemberRole = GroupMemberRole.MEMBER){
    await this.findGroupById(groupId)
    try {
      return await this.prisma.groupMember.create({
        data: {
          groupId,
          userId: userId,
          role
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(`用户 ${userId} 已是群组 ${groupId} 的成员。`);
      }
      throw error;
    }
  }
}
