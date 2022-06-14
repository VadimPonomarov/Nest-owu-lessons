import {ApiProperty} from "@nestjs/swagger";

export class CommentCommonDto {
    @ApiProperty({type: String, example: 'Text ....', description: 'Text ...'})
    text: string;
    @ApiProperty({type: Boolean, example: 'True', description: 'True/false'})
    published: boolean;
    @ApiProperty({type: Number, example: '123', description: 'Ordinal number'})
    authorId: number;
    @ApiProperty({type: Number, example: '123', description: 'Ordinal number'})
    postId: number;
}