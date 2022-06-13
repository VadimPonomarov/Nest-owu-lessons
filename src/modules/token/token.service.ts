import {ForbiddenException, Injectable} from '@nestjs/common';

import {CreateTokenDto} from './dto/create-token.dto';
import {PrismaService} from "../../core/prisma.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ITokenPair} from "./interfaces/token-pair.interface";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class TokenService {
    constructor(private _prismaService: PrismaService,
                private _jwtService: JwtService,
                private _configService: ConfigService) {
    }

    async create(createTokenDto: CreateTokenDto) {
        return await this._prismaService.token.create({data: {token: createTokenDto.token}});
    }

    async findOne(token: string) {
        return await this._prismaService.token.findUnique({where: {token: token}});
    }

    async remove(token: string) {
        return await this._prismaService.token.delete({where: {token}});
    }

    getTokenPair(user: Partial<CreateUserDto>): ITokenPair {
        const payLoad = {name: user.name, email: user.email};
        const accessToken = this._jwtService.sign(payLoad,
            {
                secret: this._configService.get('token_secret'),
                expiresIn: '15m'
            });
        const refreshToken = this._jwtService.sign(payLoad,
            {
                secret: this._configService.get('token_secret'),
                expiresIn: '30d'
            });
        return {accessToken, refreshToken};
    }

    async refreshTokenPair(refreshToken: string): Promise<ITokenPair> {
        const tokenDAta = await this._jwtService.verify(refreshToken,
            {
                secret: await this._configService.get('token_secret')
            });

        if (!tokenDAta) {
            throw new ForbiddenException();
        }
        const {name, email} = tokenDAta;
        return await this.getTokenPair({name, email});
    }

    async isTokenValid(token: string): Promise<boolean> {
        const isTokenValid = await this._jwtService.verify(token,
            {
                secret: await this._configService.get('token_secret')
            }
        );
        const isTokenInDB = await this.findOne(token);
        return isTokenValid || isTokenInDB;
    }
}
