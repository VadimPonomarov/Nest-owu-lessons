import {Injectable} from '@nestjs/common';
import {User, Prisma} from '@prisma/client';
import {PrismaService} from "../../core/prisma.service";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                posts: true,
            },
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prismaService.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                posts: true,
            },
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({
            data,
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const {where, data} = params;
        return this.prismaService.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.delete({
            where,
        });
    }
}
