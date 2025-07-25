import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response as ExpressResponse, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        data: {
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
                id: number;
                createdAt: Date;
                title: string;
                content: string | null;
                published: boolean;
                updatedAt: Date;
                authorId: string | null;
            }[];
            _count: {
                recordedTransactions: number;
                groupMemberships: number;
                posts: number;
            };
        };
        msg: string;
    }>;
    login(dto: LoginDto, res: ExpressResponse): Promise<{
        access_token: string;
    }>;
    refresh(req: Request, res: ExpressResponse): Promise<{
        access_token: string;
    }>;
    logout(req: Request, res: ExpressResponse): Promise<{
        message: string;
    }>;
}
