import {Module} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "../../core/prisma.service";

import {TokenService} from './token.service';

@Module({
    providers: [TokenService, JwtService, PrismaService],
    exports: [TokenService],
})
export class TokenModule {
}
