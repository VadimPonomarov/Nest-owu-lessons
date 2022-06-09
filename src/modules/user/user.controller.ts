import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private _userService: UserService) {
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return await this._userService.createUser(user);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('/user/:id')
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {

        return await this._userService.updateUser({where: {id: Number(id)}, data: user});
    }

    @HttpCode(HttpStatus.FOUND)
    @Get('')
    async getUsers() {
        return await this._userService.users({});
    }

    @HttpCode(HttpStatus.FOUND)
    @Get('user/:id')
    async getUser(@Param('id') id: string) {
        return await this._userService.user({id: +id});
    }

    @HttpCode(HttpStatus.OK)
    @Delete('user/:id')
    async deleteUser(@Param('id') id: string) {
        return await this._userService.deleteUser({id: +id});
    }
}
