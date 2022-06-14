import {ApiProperty} from "@nestjs/swagger";

export class CommonPostDto {
    @ApiProperty({type: 'string', example: 'Title', description: 'Title'})
    title: string;
    @ApiProperty({type: 'string', example: 'Text ....', description: 'Text ...'})
    content: string;
    @ApiProperty({type: 'boolean', example: 'True', description: 'True/false'})
    published: boolean;
    @ApiProperty({type: 'integer', example: '123', description: 'Ordinal number'})
    userId: number;
}