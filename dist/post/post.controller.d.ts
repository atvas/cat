import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(dto: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(authorId: string, page?: string, pageSize?: string): Promise<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PostClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        published: boolean;
        authorId: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(ids: string): Promise<string>;
    update(id: string, dto: UpdatePostDto): Promise<{
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
}
