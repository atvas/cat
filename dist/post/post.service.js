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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let PostService = class PostService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    postInclude = {
        author: {
            select: {
                name: true,
                email: true
            }
        }
    };
    create(data) {
        return this.prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                published: data.published,
                author: {
                    connect: { userId: data.authorId }
                },
            },
            include: this.postInclude
        });
    }
    async update(id, data) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException(`不存在ID为${id}的帖子`);
        }
        return this.prisma.post.update({
            where: { id },
            data,
            include: this.postInclude
        });
    }
    async findAll(page = 1, pageSize = 10, authorId = null) {
        const skip = (page - 1) * pageSize;
        const where = authorId ? { authorId: authorId } : {};
        const [list, total] = await Promise.all([
            this.prisma.post.findMany({
                skip,
                take: pageSize,
                orderBy: { id: 'desc' },
                where,
                include: this.postInclude
            }),
            this.prisma.post.count({
                where,
            }),
        ]);
        return {
            list,
            total,
        };
    }
    findOne(id) {
        return this.prisma.post.findUnique({ where: { id } });
    }
    async remove(ids) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const result = await this.prisma.post.deleteMany({
            where: { id: { in: idArray } },
        });
        if (result.count === 0) {
            throw new common_1.NotFoundException('没有找到要删除的帖子');
        }
        return `成功删除${result.count}条帖子`;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map