import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-tranaction.dto';
import { JwtPayload, User } from '../auth/user.decorator';
import { PaginationDto } from './dto/pagination.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTransaction(@Body() createTransactionDto:CreateTransactionDto,@User() user:JwtPayload){
    return this.transactionService.createTransaction(user.userId, createTransactionDto)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneTransactions(@User() user:JwtPayload,@Param('id') id : string) {
    return this.transactionService.findOneTransactions(user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllTransactions( @User() user:JwtPayload, @Query() {page,pageSize}:PaginationDto) {
    return this.transactionService.findAllTransactions(user.userId,+page,+pageSize);
  }
}
