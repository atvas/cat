import { PrismaService } from 'nestjs-prisma';
import { CreateTransactionDto } from './dto/create-tranaction.dto';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly transactionInclude;
    createTransaction(recorderId: string, createDto: CreateTransactionDto): Promise<{
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
    findOneTransactions(recorderId: string, id: string): Promise<({
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
    findAllTransactions(recorderId: string, page: number, pageSize: number): Promise<{
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
