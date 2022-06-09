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

    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({example: '12345', description: 'Password'})
    @IsString()
    @Length(3, 10)
    readonly password: string;

    @ApiProperty({example: false, description: 'Public status'})
    @IsBoolean()
    public status: boolean;
};