import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-tranaction.dto';
import { JwtPayload } from '../auth/user.decorator';
import { SelectTransactionDto } from './dto/select-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    createTransaction(createTransactionDto: CreateTransactionDto, user: JwtPayload): Promise<{
        recorder: {
            id: number;
            userId: string;
            email: string;
            name: string | null;
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
            email: string;
            name: string | null;
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
    findAllTransactions(user: JwtPayload, dto: SelectTransactionDto): Promise<{
        list: ({
            groupTransaction: ({
                group: {
                    id: string;
                    description: string | null;
                    name: string;
                    createdAt: Date;
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
