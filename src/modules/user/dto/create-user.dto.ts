import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {CommonUserDto} from "./common-user-dto";

export class CreateUserDto extends CommonUserDto {

    @ApiProperty({type: String, example: 'user@gmail.com', description: 'Email'})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({type: String, example: '12345', description: 'Password', minLength: 2, maxLength: 10})
    @IsString()
    @Length(2, 10)
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({type: Boolean, example: false, description: 'Public status'})
    @IsBoolean()
    public status: boolean;
};