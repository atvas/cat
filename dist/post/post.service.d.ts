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
            id: number;
            userId: string;
            name: string | null;
            email: string;
            password: string;
            refreshToken: string | null;
            createdAt: Date;
        } | null;
    } & {
        title: string;
        content: string | null;
        published: boolean;
        authorId: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: number, data: UpdatePostDto): Promise<{
        author: {
            id: number;
            userId: string;
            name: string | null;
            email: string;
            password: string;
            refreshToken: string | null;
            createdAt: Date;
        } | null;
    } & {
        title: string;
        content: string | null;
        published: boolean;
        authorId: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, pageSize?: number, authorId?: string | null): Promise<{
        list: ({
            author: {
                id: number;
                userId: string;
                name: string | null;
                email: string;
                password: string;
                refreshToken: string | null;
                createdAt: Date;
            } | null;
        } & {
            title: string;
            content: string | null;
            published: boolean;
            authorId: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
    }>;
    findOne(id: number): Prisma.Prisma__PostClient<{
        title: string;
        content: string | null;
        published: boolean;
        authorId: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(ids: number[] | number): Promise<string>;
}
