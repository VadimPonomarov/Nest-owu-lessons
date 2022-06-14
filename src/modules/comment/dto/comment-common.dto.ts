import {ApiProperty} from "@nestjs/swagger";

export class CommentCommonDto {
    @ApiProperty({type: 'string', example: 'Text ....', description: 'Text ...'})
    text: string;
    @ApiProperty({type: 'boolean', example: 'True', description: 'True/false'})
    published: boolean;
    @ApiProperty({type: 'integer', example: '123', description: 'Ordinal number'})
    authorId: number;
    @ApiProperty({type: 'integer', example: '123', description: 'Ordinal number'})
    postId: number;
}