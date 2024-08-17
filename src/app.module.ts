import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { FileStorageModule } from './lib/aws.s3/file_storage.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        };
      },
    }),
    PostsModule,
    FileStorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
