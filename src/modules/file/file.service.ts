import {Injectable} from '@nestjs/common';
import * as fs from "fs";
import {join} from 'path';

@Injectable()
export class FileService {

    remove(id: string) {
        const pathToFile = join(process.cwd(), 'public', 'static', 'upload', id.trim());
        return fs.unlinkSync(pathToFile);
    }

    isFileInDir(id: string) {
        const dir = join(process.cwd(), 'public', 'static', 'upload');
        const files = fs.readdirSync(dir);

        for (const file of files) {
            if (file === id.trim()) {
                return true;
            }
        }
        return false;
    }
}
