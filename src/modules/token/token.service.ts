import {ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
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
        try {
            return await this._prismaService.token.create({data: {token: createTokenDto.token}});
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(token: string) {
        try {
            return await this._prismaService.token.findUnique({where: {token: token}});
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    async remove(token: string) {
        try {
            return await this._prismaService.token.delete({where: {token}});
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    getTokenPair(user: Partial<CreateUserDto>): ITokenPair {
        try {
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
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    async refreshTokenPair(refreshToken: string): Promise<ITokenPair> {
        try {
            const tokenDAta = await this._jwtService.verify(refreshToken,
                {
                    secret: configuration().token_secret
                });

            if (!tokenDAta) {
                throw new ForbiddenException();
            }
            const {name, email} = tokenDAta;
            return await this.getTokenPair({name, email});
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    isTokenValid(token: string): boolean {
        try {
            const isTokenValid = this._jwtService.verify(token,
                {
                    secret: configuration().token_secret
                }
            );
            return isTokenValid;
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }
}
