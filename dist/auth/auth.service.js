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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const nanoid_1 = require("nanoid");
const jwt_1 = require("@nestjs/jwt");
const process = require("node:process");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    userSelect = {
        userId: true,
        email: true,
        name: true,
    };
    async register(data) {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (user) {
            throw new common_1.NotFoundException('用戶已存在');
        }
        const nanoid = (0, nanoid_1.customAlphabet)('0123456789', 8);
        const id = nanoid();
        return this.prisma.user.create({
            data: {
                ...data,
                userId: id
            },
            select: this.userSelect
        });
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return null;
        const passwordMatches = await bcrypt.compare(password, user.password);
        return passwordMatches ? user : null;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const tokens = await this.generateTokens(user.userId, user.email);
        await this.storeRefreshToken(user.userId, tokens.refresh_token);
        return tokens;
    }
    async generateTokens(userId, email) {
        const payload = { sub: userId, email };
        const [access_token, refresh_token] = await Promise.all([
            this.jwt.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '15m'
            }),
            this.jwt.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            })
        ]);
        return { access_token, refresh_token };
    }
    async storeRefreshToken(userId, token) {
        const hashed = await bcrypt.hash(token, 10);
        await this.prisma.user.update({
            where: { userId: userId },
            data: { refreshToken: hashed },
        });
    }
    async refreshTokens(token) {
        if (!token)
            throw new common_1.ForbiddenException('Invalid token');
        const payload = await this.jwt.verifyAsync(token, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
        if (!user?.refreshToken)
            throw new common_1.ForbiddenException('Invalid token');
        const tokens = await this.generateTokens(user.userId, user.email);
        await this.storeRefreshToken(user.userId, tokens.refresh_token);
        return tokens;
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { userId: userId },
            data: {
                refreshToken: null
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map