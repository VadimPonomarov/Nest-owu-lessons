import {
    Controller,
    Post,
    Delete,
    UseInterceptors,
    UploadedFile,
    NotFoundException,
    Get,
    Res,
    Param,
} from '@nestjs/common';
import {FileService} from './file.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {join} from "path";
import {Response} from "express";

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    createFile(@UploadedFile() file: Express.Multer.File) {
        return {
            id: file.filename,
        };
    }

    @Delete('remove/:id')
    remove(@Param('id') id: string) {
        try {
            this.fileService.remove(id);
            return 'The file has been deleted';
        } catch (e) {
            throw new NotFoundException();
        }
    }

    @Get('show/:id')
    async get(@Param('id') id: string, @Res() res: Response) {
        if (this.fileService.isFileInDir(id)) {
            await res.sendFile(id, {root: join(process.cwd(), 'public/static/upload')});
        } else {
            throw new NotFoundException();
        }

    }
}
