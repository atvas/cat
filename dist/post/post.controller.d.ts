import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(dto: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(authorId: string, page?: string, pageSize?: string): Promise<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PostClient<{
        title: string;
        content: string | null;
        published: boolean;
        authorId: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(ids: string): Promise<string>;
    update(id: string, dto: UpdatePostDto): Promise<{
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
}
