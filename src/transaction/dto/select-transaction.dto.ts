import {  IsString, IsOptional  } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class SelectTransactionDto extends PaginationDto {
  @IsOptional()
  @IsString()
  groupId?: string;
}