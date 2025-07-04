import { IsNumber, IsString, IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';
import { Category } from '@prisma/client';

export class CreateTransactionDto {
  // 金额
  @IsNumber()
  amount: number;

  // 描述
  @IsString()
  description: string;

  // 时间可选 或者创建时间
  @IsDateString()
  @IsOptional()
  date?: string;

  // 分类
  @IsEnum(Category)
  @IsOptional()
  category?: Category;


  @IsString()
  @IsOptional()
  groupId?: string; // 可选：如果这笔花销属于某个群组
}