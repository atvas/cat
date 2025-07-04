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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const user_service_1 = require("../user/user.service");
const client_1 = require("@prisma/client");
let GroupsService = class GroupsService {
    prisma;
    userService;
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    userSelect = {
        email: true,
        name: true,
    };
    create(data) {
        return this.prisma.group.create({ data });
    }
    async findGroupById(id, userId) {
        const group = await this.prisma.group.findUnique({
            where: {
                id: id,
                ...(userId && {
                    members: {
                        some: {
                            userId: userId
                        }
                    }
                })
            },
            include: {
                _count: {
                    select: {
                        members: true,
                        groupTransactions: true
                    }
                }
            }
        });
        if (!group) {
            throw new common_1.NotFoundException(`Group not found`);
        }
        const totalAmount = await this.findGroupsTotalAmount(group.id);
        return {
            group,
            totalAmount
        };
    }
    async findGroupsTotalAmount(groupId) {
        const totalExpenseResult = await this.prisma.transaction.aggregate({
            where: {
                groupTransaction: {
                    groupId: groupId
                }
            },
            _sum: {
                amount: true
            }
        });
        return totalExpenseResult._sum.amount || 0;
    }
    async findAllGroups() {
        return this.prisma.group.findMany();
    }
    async addMembersToGroup(groupId, userId, role = client_1.GroupMemberRole.MEMBER) {
        await this.findGroupById(groupId);
        try {
            return await this.prisma.groupMember.create({
                data: {
                    groupId,
                    userId: userId,
                    role
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException(`用户 ${userId} 已是群组 ${groupId} 的成员。`);
            }
            throw error;
        }
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService, user_service_1.UserService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map