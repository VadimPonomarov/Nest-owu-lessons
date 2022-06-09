import {Controller, Get, Param} from '@nestjs/common';
import {IUser, UserService} from "./user.service";

@Controller('users')
export class UserController {
    constructor(private _userService: UserService) {
    }

    @Get()
    createUser(@Body() user: IUser) {
        return this._userService.createUser(user);
    }

    @Get()
    getUserByEmail(email: string) {
        return this._userService.getUserByEmail(email);
    }
}
