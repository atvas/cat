import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // 移除任何不在 DTO 中定义的属性
      forbidNonWhitelisted: false, // 如果存在不在 DTO 中定义的属性，则抛出异常
      transform: true, // 启用自动转换，例如将字符串转换为数字或布尔值
      // disableErrorMessages: true, // 生产环境中可以考虑禁用详细的错误信息
    }),
  );

  // 全局成功拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局错误过滤器
  app.useGlobalFilters(new GlobalExceptionFilter());
  //启用cookie中间件
  app.use(cookieParser())

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('描述')
    .setVersion('1.0')
    .build());
  SwaggerModule.setup('docs', app, document);


  await app.listen(process.env.PORT ?? 3000,()=>{
    console.log('127.0.0.1:3000');
  });
}
bootstrap();
