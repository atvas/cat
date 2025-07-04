import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'nestjs-prisma';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  private readonly postInclude : Prisma.PostInclude = {
    author: {
      select : {
        name : true,
        email : true
      }
    }
  }

  /**
   * 创建帖子
   * @param data
   */
  create(data: CreatePostDto) {
    return this.prisma.post.create({
      data:{
        title: data.title,
        content: data.content,
        published: data.published,
        author:{
          connect: { userId: data.authorId }
        },
      },
      include: this.postInclude
    });
  }

  /**
   * 更新帖子
   * @param id
   * @param data
   */
  async update(id: number, data: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`不存在ID为${id}的帖子`);
    }
    return this.prisma.post.update({
      where: { id },
      data,
      include: this.postInclude
    });
  }

  /**
   * 获取列表
   * @param page
   * @param pageSize
   * @param authorId
   */
  async findAll(page: number = 1, pageSize: number = 10, authorId: string | null = null) {
    const skip = (page - 1) * pageSize;
    const where = authorId ? { authorId : authorId } : {};

    const [list, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        where,
        include: this.postInclude
      }),
      this.prisma.post.count({
        where,
      }),
    ]);

    return {
      list,
      total,
    };
  }

  /**
   * 查询单个帖子
   * @param id
   */
  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  /**
   * 删除帖子
   * @param ids
   */
  async remove(ids: number[] | number) {
    const idArray = Array.isArray(ids) ? ids : [ids];
    const result = await this.prisma.post.deleteMany({
      where: { id: { in: idArray } },
    });
    if (result.count === 0) {
      throw new NotFoundException('没有找到要删除的帖子');
    }
    return `成功删除${result.count}条帖子`;
  }
}
