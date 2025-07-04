import { PrismaService } from 'nestjs-prisma';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    private readonly userSelect;
    register(data: RegisterDto): Promise<{
        name: string | null;
        id: number;
        userId: string;
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
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string | null;
            published: boolean;
            authorId: string | null;
        }[];
        _count: {
            recordedTransactions: number;
            groupMemberships: number;
            posts: number;
        };
    }>;
    validateUser(email: string, password: string): Promise<{
        name: string | null;
        id: number;
        userId: string;
        email: string;
        password: string;
        refreshToken: string | null;
        createdAt: Date;
    } | null>;
    login(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    generateTokens(userId: string, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    storeRefreshToken(userId: string, token: string): Promise<void>;
    refreshTokens(token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<void>;
}
