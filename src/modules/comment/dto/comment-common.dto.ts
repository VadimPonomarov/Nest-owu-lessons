import {ApiProperty} from "@nestjs/swagger";

export class CommentCommonDto {
    @ApiProperty({example: 'Text ....', description: 'Text ...'})
    text: string;
    @ApiProperty({example: 'True', description: 'True/false'})
    published: boolean;
    @ApiProperty({example: '123', description: 'Ordinal number'})
    authorId: number;
    @ApiProperty({example: '123', description: 'Ordinal number'})
    postId: number;
}