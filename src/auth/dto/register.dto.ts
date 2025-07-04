import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto{
  @IsOptional()
  name?: string;

  @IsNotEmpty({message : "邮箱不能为空"})
  @IsEmail({},{message : "请输入正确的邮箱格式"})
  email: string;

  @IsNotEmpty({message: "密码不能为空"})
  password: string;
}