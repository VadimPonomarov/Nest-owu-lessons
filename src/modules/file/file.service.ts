import {Injectable} from '@nestjs/common';
import * as fs from "fs";
import {join} from 'path';

@Injectable()
export class FileService {

    remove(id: string) {
        const pathToFile = join(process.cwd(), 'static', 'upload', id.trim());
        return fs.unlinkSync(pathToFile);
    }
}
