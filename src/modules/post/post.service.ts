import {Injectable} from '@nestjs/common';
import {Post, Prisma} from '@prisma/client';
import {PrismaService} from "../../core/prisma.service";

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) {
    }

    async post(
        postWhereUniqueInput: Prisma.PostWhereUniqueInput,
    ): Promise<Post | null> {
        return this.prismaService.post.findUnique({
            where: postWhereUniqueInput,
            include: {comments: true}
        });
    }

    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<Post[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prismaService.post.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {comments: true}
        });
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prismaService.post.create({
            data,
        });
    }

    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post> {
        const {where, data} = params;
        return this.prismaService.post.update({
            data,
            where,
        });
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prismaService.post.delete({
            where,
        });
    }
}
