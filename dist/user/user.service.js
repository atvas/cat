"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    userSelect = {
        userId: true,
        email: true,
        name: true,
    };
    async findOne(userId) {
        const user = await this.prisma.user.findUnique({ where: { userId }, select: this.userSelect });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(userId, data) {
        const user = await this.prisma.user.findUnique({ where: { userId: userId } });
        if (!user) {
            throw new common_1.NotFoundException('用户不存在');
        }
        return this.prisma.user.update({
            where: {
                userId: userId
            },
            data: {
                name: data.name
            },
            select: this.userSelect
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map