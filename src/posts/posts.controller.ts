import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileStorageService } from 'src/lib/aws.s3/file_storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';

@Controller('posts')
@ApiTags("Post")
export class PostsController {
  constructor(
    private readonly postsService: PostsService, 
    private readonly fileStorageService: FileStorageService
  ) { }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(1);    
    const key = new Date().toISOString() + file.originalname.split(" ");
    return this.fileStorageService.saveFile(key, file);
  }
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,

  ) {
    return this.postsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
