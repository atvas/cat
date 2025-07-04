import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'nestjs-prisma';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly postInclude;
    create(data: CreatePostDto): Prisma.Prisma__PostClient<{
        author: {
            name: string | null;
            id: number;
            userId: string;
            email: string;
            password: string;
            refreshToken: string | null;
            createdAt: Date;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        published: boolean;
        authorId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: number, data: UpdatePostDto): Promise<{
        author: {
            name: string | null;
            id: number;
            userId: string;
            email: string;
            password: string;
            refreshToken: string | null;
            createdAt: Date;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        published: boolean;
        authorId: string | null;
    }>;
    findAll(page?: number, pageSize?: number, authorId?: string | null): Promise<{
        list: ({
            author: {
                name: string | null;
                id: number;
                userId: string;
                email: string;
                password: string;
                refreshToken: string | null;
                createdAt: Date;
            } | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string | null;
            published: boolean;
            authorId: string | null;
        })[];
        total: number;
    }>;
    findOne(id: number): Prisma.Prisma__PostClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        published: boolean;
        authorId: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(ids: number[] | number): Promise<string>;
}
