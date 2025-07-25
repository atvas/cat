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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let TransactionService = class TransactionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    transactionInclude = {
        recorder: { select: { userId: true, email: true, name: true } },
        groupTransaction: { include: { group: true } }
    };
    async createTransaction(recorderId, createDto) {
        if (createDto.groupId) {
            const group = await this.prisma.group.findUnique({ where: { id: createDto.groupId } });
            if (!group) {
                throw new common_1.NotFoundException(`群组 ID ${createDto.groupId} 未找到。`);
            }
            const isMember = await this.prisma.groupMember.findFirst({
                where: { groupId: createDto.groupId, userId: recorderId },
            });
            if (!isMember) {
                throw new common_1.ConflictException(`记录者 (用户 ID: ${recorderId}) 不是群组 ${createDto.groupId} 的成员。`);
            }
        }
        return this.prisma.transaction.create({
            data: {
                amount: createDto.amount,
                description: createDto.description,
                date: createDto.date ? new Date(createDto.date) : undefined,
                category: createDto.category,
                recorder: {
                    connect: { userId: recorderId },
                },
                ...(createDto.groupId && {
                    groupTransaction: {
                        create: {
                            group: {
                                connect: { id: createDto.groupId }
                            }
                        }
                    }
                })
            },
            include: this.transactionInclude
        });
    }
    async findOneTransactions(recorderId, id) {
        return this.prisma.transaction.findUnique({
            where: {
                id: id,
                recorderId: recorderId
            },
            include: this.transactionInclude
        });
    }
    async findAllTransactions(recorderId, dto) {
        const page = +dto.page, pageSize = +dto.pageSize;
        const skip = (page - 1) * pageSize;
        const [list, total] = await Promise.all([
            this.prisma.transaction.findMany({
                skip,
                take: pageSize,
                orderBy: { id: 'desc' },
                where: {
                    recorderId: recorderId,
                    ...(dto.groupId && {
                        groupTransaction: {
                            group: {
                                id: dto.groupId
                            }
                        }
                    })
                },
                include: {
                    groupTransaction: {
                        include: {
                            group: true
                        }
                    }
                }
            }),
            this.prisma.transaction.count({
                where: {
                    recorderId: recorderId,
                    ...(dto.groupId && {
                        groupTransaction: {
                            group: {
                                id: dto.groupId
                            }
                        }
                    })
                }
            })
        ]);
        return {
            list,
            total
        };
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map