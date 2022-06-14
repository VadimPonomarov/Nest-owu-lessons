import {ApiProperty} from "@nestjs/swagger";

export class CommonPostDto {
    @ApiProperty({type: String, example: 'Title', description: 'Title'})
    title: string;
    @ApiProperty({type: String, example: 'Text ....', description: 'Text ...'})
    content: string;
    @ApiProperty({type: Boolean, example: 'True', description: 'True/false'})
    published: boolean;
    @ApiProperty({type: Number, example: '123', description: 'Ordinal number'})
    userId: number;
}