import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService, IPostsRo } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  @ApiOperation({ summary: '获取文章列表' })
  @Get()
  async findAll(@Query() query): Promise<IPostsRo> {
    return await this.postsService.findAll(query);
  }

  @ApiOperation({ summary: '获取指定文章' })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.findById(id);
  }

  @ApiOperation({ summary: '更新文章' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  @ApiOperation({ summary: '删除' })
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }
}
