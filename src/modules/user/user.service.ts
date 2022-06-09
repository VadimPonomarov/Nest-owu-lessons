import {Injectable} from '@nestjs/common';

export interface IUser {
    name: string;
    email: string;
}

@Injectable()
export class UserService {
    users: IUser[];

    createUser(user: IUser) {
        if (!this.getUserByEmail(user.email)) {
            this.users.push(user);
            return true;
        } else {
            throw new Error('Такой пользователь уже существует');
        }
    }

    getUserByEmail(email: string) {
        if (this.users.find(user => user.email === email)) {
            return this.users.find(user => user.email === email);
        } else {
            throw new Error('Такой пользователь уже существует');
        }
    }


}
