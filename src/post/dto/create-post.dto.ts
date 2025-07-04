import {
  IsString,
  Length,
  IsBoolean,
  IsOptional,
  IsNotEmpty, IsNumber,
} from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须是字符串类型' })
  @Length(2, 20, {
    message: '标题长度必须在2到20个字符之间',
  })
  title: string;

  @IsOptional()
  @IsString({ message: '内容必须是字符串类型' })
  content?: string;

  @IsOptional()
  @IsBoolean({ message: '发布状态必须是布尔类型' })
  published?: boolean;

  @IsNotEmpty({message :"作者ID不能为空"})
  @IsString()
  authorId: string;
}
