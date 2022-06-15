import {
    Controller,
    Post,
    Delete,
    UseInterceptors,
    UploadedFile,
    Query, NotFoundException,
} from '@nestjs/common';
import {FileService} from './file.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {join} from "path";

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    createFile(@UploadedFile() file: Express.Multer.File) {
        return {
            id: file.filename,
            path: join(process.cwd(), file.destination, file.filename)
        };
    }

    @Delete('remove')
    remove(@Query('name') name: string) {
        try {
            return this.fileService.remove(name);
        } catch (e) {
            throw new NotFoundException();
        }
    }
}
