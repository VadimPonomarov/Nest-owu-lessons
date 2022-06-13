import {Module} from '@nestjs/common';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TokenService} from "../token/token.service";
import {UserService} from "../user/user.service";
import {TokenModule} from "../token/token.module";
import {UserModule} from "../user/user.module";
import {ConfigService} from "@nestjs/config";
import {PrismaClient} from "@prisma/client";
import {PrismaService} from "../../core/prisma.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {AuthGuard} from "./auth.guard";

@Module({
    imports: [TokenModule, UserModule, PrismaClient, JwtModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        TokenService,
        UserService,
        ConfigService,
        PrismaService,
        JwtService,
        AuthGuard
    ],
    exports: [AuthService]
})
export class AuthModule {
}
