import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../core/prisma.service";
import {Comment, Prisma} from "@prisma/client";

@Injectable()
export class CommentService {
    constructor(private prismaService: PrismaService) {
    }

    async comment(
        commentWhereUniqueInput: Prisma.CommentWhereUniqueInput,
    ): Promise<Comment | null> {
        return await this.prismaService.comment.findUnique({
            where: commentWhereUniqueInput,
        });
    }

    async comments(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CommentWhereUniqueInput;
        where?: Prisma.CommentWhereInput;
        orderBy?: Prisma.CommentOrderByWithRelationInput;
    }): Promise<Comment[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return await this.prismaService.comment.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
        return await this.prismaService.comment.create({
            data,
        });
    }

    async updateComment(params: {
        where: Prisma.CommentWhereUniqueInput;
        data: Prisma.CommentUpdateInput;
    }): Promise<Comment> {
        const {where, data} = params;
        return await this.prismaService.comment.update({
            data,
            where,
        });
    }

    async deleteComment(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
        return await this.prismaService.comment.delete({
            where,
        });
    }
}
