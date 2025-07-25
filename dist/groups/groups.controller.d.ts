import { GroupsService } from './groups.service';
import { JwtPayload } from '../auth/user.decorator';
import { CreateGroupsDto } from './dto/create-groups.dto';
export declare class GroupsController {
    private readonly groupService;
    constructor(groupService: GroupsService);
    create(user: JwtPayload, createDto: CreateGroupsDto): Promise<{
        group: {
            _count: {
                members: number;
                groupTransactions: number;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        totalAmount: number;
    }>;
    findOne(groupId: string, user: JwtPayload): Promise<{
        group: {
            _count: {
                members: number;
                groupTransactions: number;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        totalAmount: number;
    }>;
    addGroupMember(groupId: string, user: JwtPayload): Promise<{
        id: string;
        userId: string;
        groupId: string;
        joinedAt: Date;
        role: import(".prisma/client").$Enums.GroupMemberRole;
    }>;
}
