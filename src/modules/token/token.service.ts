import {Injectable} from '@nestjs/common';

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
        return await this._prismaService.token.findUnique({where: {token}});
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
        if (this.isTokenValid(refreshToken)) {
            const {user} = await this._jwtService.verify(refreshToken);
            await this.remove(refreshToken);
            return await this.getTokenPair(user);
        }
    }

    async isTokenValid(token: string): Promise<boolean> {
        const isTokenValid = await this._jwtService.verify(token);
        const isTokenInDB = await this.findOne(token);
        return isTokenValid || isTokenInDB;
    }
}
