import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreatePostDto} from "../post/dto/create-post.dto";
import {UpdatePostDto} from "../post/dto/update-post.dto";
import {PostService} from "./post.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Posts')
@Controller('posts')
export class PostController {
    constructor(private _postService: PostService) {
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createPost(@Body() post: CreatePostDto) {
        return await this._postService.createPost(post);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('/post/:id')
    async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {

        return await this._postService.updatePost({where: {id: Number(id)}, data: post});
    }

    @HttpCode(HttpStatus.FOUND)
    @Get('')
    async getPosts() {
        return await this._postService.posts({});
    }

    @HttpCode(HttpStatus.FOUND)
    @Get('post/:id')
    async getPost(@Param('id') id: string) {
        return await this._postService.post({id: +id});
    }

    @HttpCode(HttpStatus.OK)
    @Delete('post/:id')
    async deletePost(@Param('id') id: string) {
        return await this._postService.deletePost({id: +id});
    }
}
