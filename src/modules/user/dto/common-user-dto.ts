import {IsNumber, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CommonUserDto {

    @ApiProperty({example: 'userName', description: 'User name'})
    @IsString()
    @Length(2, 10)
    public name: string;

    @ApiProperty({example: '33', description: 'User age'})
    @IsNumber()
    public age: number;

    @ApiProperty({example: 'Zaporozhye', description: 'City name'})
    @IsString()
    public city: string;
}