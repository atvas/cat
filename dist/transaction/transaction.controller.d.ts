import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-tranaction.dto';
import { JwtPayload } from '../auth/user.decorator';
import { PaginationDto } from './dto/pagination.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    createTransaction(createTransactionDto: CreateTransactionDto, user: JwtPayload): Promise<{
        recorder: {
            name: string | null;
            id: number;
            userId: string;
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
            name: string | null;
            id: number;
            userId: string;
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
                    name: string;
                    id: string;
                    createdAt: Date;
                    description: string | null;
                    updatedAt: Date;
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
