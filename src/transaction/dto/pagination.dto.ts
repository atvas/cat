import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationDto{
  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  pageSize : string;

  constructor(partial?: Partial<PaginationDto>) {
    Object.assign(this, partial);
    if (!this.page) {
      this.page = '1';
    }
    if (!this.pageSize) {
      this.pageSize = '10';
    }
  }
}