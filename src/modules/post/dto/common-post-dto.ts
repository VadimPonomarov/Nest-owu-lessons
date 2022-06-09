import {ApiProperty} from "@nestjs/swagger";

export class CommonPostDto {
    @ApiProperty({example: 'Title', description: 'Title'})
    title: string;
    @ApiProperty({example: 'Text ....', description: 'Text ...'})
    content: string;
    @ApiProperty({example: 'True', description: 'True/false'})
    published: boolean;
    @ApiProperty({example: '123', description: 'Ordinal number'})
    userId: number;
}