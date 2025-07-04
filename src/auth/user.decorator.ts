import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// 自定义 Payload 类型
export interface JwtPayload {
  userId: string;
  email: string;
}

export const User = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;
    return data ? user?.[data] : user;
  },
);