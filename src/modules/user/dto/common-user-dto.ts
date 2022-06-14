import {IsNumber, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CommonUserDto {

    @ApiProperty({type: String, example: 'userName', description: 'User name', minLength: 2, maxLength: 10})
    @IsString()
    @Length(2, 10)
    public name: string;

    @ApiProperty({type: Number, example: '33', description: 'User age'})
    @IsNumber()
    public age: number;

    @ApiProperty({type: String, example: 'Zaporozhye', description: 'City name'})
    @IsString()
    public city: string;
}