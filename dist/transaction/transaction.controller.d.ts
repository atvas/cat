import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-tranaction.dto';
import { JwtPayload } from '../auth/user.decorator';
import { PaginationDto } from './dto/pagination.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    createTransaction(createTransactionDto: CreateTransactionDto, user: JwtPayload): Promise<{
        recorder: {
            id: number;
            userId: string;
            name: string | null;
            email: string;
            password: string;
            refreshToken: string | null;
            createdAt: Date;
        };
        groupTransaction: {
            id: string;
            groupId: string;
            transactionId: string;
        } | null;
    } & {
        id: string;
        amount: number;
        description: string;
        date: Date;
        category: import(".prisma/client").$Enums.Category | null;
        recorderId: string;
    }>;
    findOneTransactions(user: JwtPayload, id: string): Promise<({
        recorder: {
            id: number;
            userId: string;
            name: string | null;
            email: string;
            password: string;
            refreshToken: string | null;
            createdAt: Date;
        };
        groupTransaction: {
            id: string;
            groupId: string;
            transactionId: string;
        } | null;
    } & {
        id: string;
        amount: number;
        description: string;
        date: Date;
        category: import(".prisma/client").$Enums.Category | null;
        recorderId: string;
    }) | null>;
    findAllTransactions(user: JwtPayload, { page, pageSize }: PaginationDto): Promise<{
        list: ({
            groupTransaction: ({
                group: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                };
            } & {
                id: string;
                groupId: string;
                transactionId: string;
            }) | null;
        } & {
            id: string;
            amount: number;
            description: string;
            date: Date;
            category: import(".prisma/client").$Enums.Category | null;
            recorderId: string;
        })[];
        total: number;
    }>;
}
