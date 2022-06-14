import {IsEmail, IsString, Length, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({type: 'string', example: 'Name', description: 'User name', minLength: 2, maxLength: 10})
    @IsString()
    @Length(2, 10)
    name: string;

    @ApiProperty({type: 'string', example: 'qwerty@gmail.com', description: 'E-mail'})
    @IsEmail()
    email: string;

    @ApiProperty({type: 'string', example: 'qwerty1234', description: 'Password', minLength: 2, maxLength: 10})
    @IsString()
    @Length(2, 10)
    password: string;
}