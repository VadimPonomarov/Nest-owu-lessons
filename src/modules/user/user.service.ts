import {Injectable} from '@nestjs/common';
import {User, Prisma} from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import {PrismaService} from "../../core/prisma.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService, private _config: ConfigService) {
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return await this.prismaService.user.findUnique({
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
        return await this.prismaService.user.findMany({
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
        const bcryptedPassword = bcrypt.hashSync(data.password, 5);
        data = {...data, password: bcryptedPassword};
        return await this.prismaService.user.create({
            data,
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const {where, data} = params;
        return await this.prismaService.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return await this.prismaService.user.delete({
            where,
        });
    }
}
