import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto{

  @IsOptional()
  name?: string;
}