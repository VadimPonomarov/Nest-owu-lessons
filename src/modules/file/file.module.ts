import {Module} from '@nestjs/common';

import {FileService} from './file.service';
import {FileController} from './file.controller';
import {ConfigService} from "@nestjs/config";
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {configuration} from "../../config";

@Module({
    controllers: [FileController],
    providers: [FileService, ConfigService],
    imports: [MulterModule.register({
        storage: diskStorage({
            destination: configuration().multer_destination,
            filename: configuration().multer_filename
        })
    })]
})
export class FileModule {
}
