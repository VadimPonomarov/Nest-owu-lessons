import {Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../core/prisma.service";

@Module({
    providers: [TokenService, JwtService, ConfigService, PrismaService],
    exports: [TokenService],
})
export class TokenModule {
}
