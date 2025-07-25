import { PrismaService } from 'nestjs-prisma';
import { CreateTransactionDto } from './dto/create-tranaction.dto';
import { SelectTransactionDto } from './dto/select-transaction.dto';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly transactionInclude;
    createTransaction(recorderId: string, createDto: CreateTransactionDto): Promise<{
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
    findOneTransactions(recorderId: string, id: string): Promise<({
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
    findAllTransactions(recorderId: string, dto: SelectTransactionDto): Promise<{
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
