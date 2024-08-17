import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { FileStorageModule } from 'src/lib/aws.s3/file_storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    FileStorageModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
