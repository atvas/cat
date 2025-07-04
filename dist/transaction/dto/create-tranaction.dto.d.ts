import { Category } from '@prisma/client';
export declare class CreateTransactionDto {
    amount: number;
    description: string;
    date?: string;
    category?: Category;
    groupId?: string;
}
