import {HttpException, HttpStatus, Module, NotAcceptableException} from '@nestjs/common';

import {FileService} from './file.service';
import {FileController} from './file.controller';
import {ConfigService} from "@nestjs/config";
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {configuration} from "../../config";
import path from "path";

@Module({
    controllers: [FileController],
    providers: [FileService, ConfigService],
    imports: [MulterModule.register({
        storage: diskStorage({
            destination: configuration().multer_destination,
            filename: configuration().multer_filename,
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(
                    new HttpException(
                        'Only .png, .jpg and .jpeg format allowed!',
                        HttpStatus.FORBIDDEN),
                    false);
            }
        }
    })]
})
export class FileModule {
}
