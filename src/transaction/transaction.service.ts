import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTransactionDto } from './dto/create-tranaction.dto';
import { Prisma } from '@prisma/client';
import { PaginationDto } from './dto/pagination.dto';
import { SelectTransactionDto } from './dto/select-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma:PrismaService) {}

  private readonly transactionInclude: Prisma.TransactionInclude = {
    recorder: { select: { userId: true, email: true, name: true } },
    groupTransaction: { include: { group: true } }
  }

  /**
   * 创建消费
   * @param recorderId
   * @param createDto
   */
  async createTransaction(recorderId: string,createDto: CreateTransactionDto){
    if (createDto.groupId){
      const group = await this.prisma.group.findUnique({where:{id:createDto.groupId}});
      if (!group){
        throw new NotFoundException(`群组 ID ${createDto.groupId} 未找到。`);
      }
      const isMember = await this.prisma.groupMember.findFirst({
        where: { groupId: createDto.groupId, userId: recorderId },
      });
      if (!isMember){
        throw new ConflictException(`记录者 (用户 ID: ${recorderId}) 不是群组 ${createDto.groupId} 的成员。`);
      }
    }
    return this.prisma.transaction.create({
      data:{
        amount: createDto.amount,
        description: createDto.description,
        date: createDto.date ? new Date(createDto.date) : undefined,
        category: createDto.category,
        recorder: {
          connect: { userId: recorderId },
        },
        ...(createDto.groupId && {
          groupTransaction: {
            create: {
              group: {
                connect: { id: createDto.groupId }
              }
            }
          }
        })
      },
      include: this.transactionInclude
    })
  }

  /**
   * 查询记录
   * @param recorderId
   * @param id
   */
  async findOneTransactions(recorderId: string,id: string){
    return this.prisma.transaction.findUnique({
      where:{
        id : id,
        recorderId: recorderId
      },
      include: this.transactionInclude
    })
  }

  /**
   * 查询全部消费记录
   * @param recorderId
   * @param dto
   */
  async findAllTransactions(recorderId: string,dto:SelectTransactionDto){
    const page = +dto.page,pageSize = +dto.pageSize;
    const skip = (page - 1) * pageSize;
    const [list,total] = await Promise.all([
      this.prisma.transaction.findMany({
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        where:{
          recorderId:recorderId,
          ...(dto.groupId && {
            groupTransaction:{
              group:{
                id:dto.groupId
              }
            }
          })
        },
        include:{
          groupTransaction:{
            include:{
              group:true
            }
          }
        }
      }),
      this.prisma.transaction.count({
        where:{
          recorderId:recorderId,
          ...(dto.groupId && {
            groupTransaction:{
              group:{
                id:dto.groupId
              }
            }
          })
        }
      })
    ])
    return {
      list,
      total
    }
  }
}
