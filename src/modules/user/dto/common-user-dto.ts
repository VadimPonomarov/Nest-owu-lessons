import {IsNumber, IsString, Length} from "class-validator";

export class CommonClassDto {
    @IsString()
    @Length(2, 10)
    public name: string;
    @IsNumber()
    public age: number;
    @IsString()
    public city: string;
}