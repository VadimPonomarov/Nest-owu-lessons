import {ForbiddenException, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

import {CreateTokenDto} from './dto/create-token.dto';
import {PrismaService} from "../../core/prisma.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ITokenPair} from "./interfaces/token-pair.interface";
import {configuration} from "../../config";

@Injectable()
export class TokenService {
    constructor(private _prismaService: PrismaService,
                private _jwtService: JwtService) {
    }

    async create(createTokenDto: CreateTokenDto) {
        return await this._prismaService.token.create({data: {token: createTokenDto.token}});
    }

    async findOne(tokenData: string) {
        return await this._prismaService.token.findUnique({where: {token: tokenData}});
    }

    async remove(tokenData: string) {
        return await this._prismaService.token.delete({where: {token: tokenData}});
    }

    getTokenPair(user: Partial<CreateUserDto>): ITokenPair {
        const payLoad = {name: user.name, email: user.email};
        const accessToken = this._jwtService.sign(payLoad,
            {
                secret: configuration().token_secret,
                expiresIn: '15m'
            });
        const refreshToken = this._jwtService.sign(payLoad,
            {
                secret: configuration().token_secret,
                expiresIn: '30d'
            });
        return {accessToken, refreshToken};
    }

    async refreshTokenPair(refreshToken: string): Promise<ITokenPair> {
        const tokenDAta = await this._jwtService.verify(refreshToken,
            {
                secret: configuration().token_secret
            });

        if (!tokenDAta) {
            throw new ForbiddenException();
        }
        const {name, email} = tokenDAta;
        await this.findOne(refreshToken).then(token => {
            if (token.token === refreshToken) {
                this.remove(refreshToken);
            }
        });

        return await this.getTokenPair({name, email});
    }

    isTokenValid(tokenData: string): boolean {
        const isTokenValid = this._jwtService.verify(tokenData,
            {
                secret: configuration().token_secret
            }
        );
        return isTokenValid;
    }
}
