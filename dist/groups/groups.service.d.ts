import { PrismaService } from 'nestjs-prisma';
import { CreateGroupsDto } from './dto/create-groups.dto';
import { UserService } from '../user/user.service';
import { GroupMemberRole, Prisma } from '@prisma/client';
export declare class GroupsService {
    private readonly prisma;
    private readonly userService;
    constructor(prisma: PrismaService, userService: UserService);
    private readonly userSelect;
    create(data: CreateGroupsDto): Prisma.Prisma__GroupClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findGroupById(id: string, userId?: string): Promise<{
        group: {
            _count: {
                members: number;
                groupTransactions: number;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        };
        totalAmount: number;
    }>;
    findGroupsTotalAmount(groupId: string): Promise<number>;
    findAllGroups(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }[]>;
    addMembersToGroup(groupId: string, userId: string, role?: GroupMemberRole): Promise<{
        id: string;
        userId: string;
        groupId: string;
        joinedAt: Date;
        role: import(".prisma/client").$Enums.GroupMemberRole;
    }>;
}
