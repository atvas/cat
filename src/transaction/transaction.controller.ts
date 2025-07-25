import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-tranaction.dto';
import { JwtPayload, User } from '../auth/user.decorator';
import { SelectTransactionDto } from './dto/select-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * 创建交易
   * @param createTransactionDto
   * @param user
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTransaction(@Body() createTransactionDto:CreateTransactionDto,@User() user:JwtPayload){
    return this.transactionService.createTransaction(user.userId, createTransactionDto)
  }

  /**
   * 根据交易ID查询信交易信息
   * @param user
   * @param id
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneTransactions(@User() user:JwtPayload,@Param('id') id : string) {
    return this.transactionService.findOneTransactions(user.userId, id);
  }

  /**
   * 查询交全部交易
   * @param user
   * @param dto
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllTransactions( @User() user:JwtPayload, @Query() dto : SelectTransactionDto) {
    return this.transactionService.findAllTransactions(user.userId,dto);
  }
}
