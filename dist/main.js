"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./core/filter/http-exception/http-exception.filter");
const transform_interceptor_1 = require("./core/interceptor/transform/transform.interceptor");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: false,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.GlobalExceptionFilter());
    app.use(cookieParser());
    const document = swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
        .setTitle('接口文档')
        .setDescription('描述')
        .setVersion('1.0')
        .build());
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT ?? 3000, () => {
        console.log('127.0.0.1:3000');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map