import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import {TokenService} from "../token/token.service";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ConfigService} from "@nestjs/config";
import {ITokenPair} from "../token/interfaces/token-pair.interface";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(private _tokenService: TokenService,
                private _userService: UserService,
                private _configService: ConfigService) {
    }

    async registerUser(user: CreateUserDto): Promise<CreateUserDto> {
        const isRegistered = await this._userService.user({email: user.email});
        if (isRegistered) {
            throw new HttpException("User's email is not unique", HttpStatus.NOT_ACCEPTABLE);
        }
        return await this._userService.createUser(user);
    }

    async loginUser(user: LoginUserDto): Promise<ITokenPair> {
        const isRegistered = await this._userService.user({email: user.email});
        if (!isRegistered) {
            throw new HttpException("User's email or password is incorrect", HttpStatus.NOT_ACCEPTABLE);
        }
        const isPasswordCorrect = bcrypt.compareSync(user.password, isRegistered.password);

        if (!isPasswordCorrect) {
            throw new HttpException("'User's or password is incorrect", HttpStatus.NOT_ACCEPTABLE);
        }

        const tokenPair = await this._tokenService.getTokenPair(user);
        await this._tokenService.create({token: tokenPair.refreshToken});
        return tokenPair;
    }
}
