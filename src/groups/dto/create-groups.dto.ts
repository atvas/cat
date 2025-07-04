import { IsOptional, IsString } from 'class-validator';

export class CreateGroupsDto{
  @IsString()
  name:string;

  @IsString()
  @IsOptional()
  description?:string;
}