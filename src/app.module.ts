import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {configuration} from './config';
import {UserModule} from './modules/user/user.module';
import {UserController} from "./modules/user/user.controller";
import {UserService} from "./modules/user/user.service";
import {PrismaClient} from "@prisma/client";
import {PrismaService} from "./core/prisma.service";
import {PostModule} from './modules/post/post.module';
import {CommentModule} from './modules/comment/comment.module';
import {AuthModule} from "./modules/auth/auth.module";
import {TokenModule} from "./modules/token/token.module";


@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
    }), UserModule, PrismaClient, PostModule, CommentModule, AuthModule, TokenModule],
    controllers: [AppController, UserController],
    providers: [AppService, UserService, PrismaService],
})
export class AppModule {
}
