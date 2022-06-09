import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CommentService} from "../comment/comment.service";
import {CreateCommentDto} from "../comment/dto/create-comment.dto";
import {UpdateCommentDto} from "../comment/dto/update-comment.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
    constructor(private _commentService: CommentService) {
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createComment(@Body() comment: CreateCommentDto) {
        return await this._commentService.createComment(comment);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('/comment/:id')
    async updateComment(@Param('id') id: string, @Body() comment: UpdateCommentDto) {

        return await this._commentService.updateComment({where: {id: +id}, data: comment});
    }

    @HttpCode(HttpStatus.FOUND)
    @Get('')
    async getComments() {
        return await this._commentService.comments({});
    }

    @HttpCode(HttpStatus.FOUND)
    @Get('comment/:id')
    async getComment(@Param('id') id: string) {
        return await this._commentService.comment({id: +id});
    }

    @HttpCode(HttpStatus.OK)
    @Delete('comment/:id')
    async deleteComment(@Param('id') id: string) {
        return await this._commentService.deleteComment({id: +id});
    }
}
