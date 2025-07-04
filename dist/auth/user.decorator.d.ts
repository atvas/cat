export interface JwtPayload {
    userId: string;
    email: string;
}
export declare const User: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | keyof JwtPayload | undefined)[]) => ParameterDecorator;
