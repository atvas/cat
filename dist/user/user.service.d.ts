import { PrismaService } from 'nestjs-prisma';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly userSelect;
    findOne(userId: string): Promise<{
        id: number;
        userId: string;
        name: string | null;
        email: string;
        password: string;
        refreshToken: string | null;
        createdAt: Date;
        recordedTransactions: {
            id: string;
            amount: number;
            description: string;
            date: Date;
            category: import(".prisma/client").$Enums.Category | null;
            recorderId: string;
        }[];
        groupMemberships: {
            id: string;
            userId: string;
            groupId: string;
            joinedAt: Date;
            role: import(".prisma/client").$Enums.GroupMemberRole;
        }[];
        posts: {
            title: string;
            content: string | null;
            published: boolean;
            authorId: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        _count: {
            recordedTransactions: number;
            groupMemberships: number;
            posts: number;
        };
    }>;
    update(userId: string, data: UpdateUserDto): Promise<{
        id: number;
        userId: string;
        name: string | null;
        email: string;
        password: string;
        refreshToken: string | null;
        createdAt: Date;
        recordedTransactions: {
            id: string;
            amount: number;
            description: string;
            date: Date;
            category: import(".prisma/client").$Enums.Category | null;
            recorderId: string;
        }[];
        groupMemberships: {
            id: string;
            userId: string;
            groupId: string;
            joinedAt: Date;
            role: import(".prisma/client").$Enums.GroupMemberRole;
        }[];
        posts: {
            title: string;
            content: string | null;
            published: boolean;
            authorId: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        _count: {
            recordedTransactions: number;
            groupMemberships: number;
            posts: number;
        };
    }>;
}
