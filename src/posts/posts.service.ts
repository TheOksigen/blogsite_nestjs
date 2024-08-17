import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>) { }

  async create(createPostDto: CreatePostDto) {
    const post = await this.postModel.create(createPostDto)
    return await post.save();
  }

  async findAll(page: number, limit: number) {
    const totalItems = await this.postModel.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);
    const data = await this.postModel.find().skip((page - 1) * limit).limit(limit).exec();
    return { data, totalItems, page, limit, totalPages }
  }

  findOne(id: string) {
    return this.postModel.findById(id);
  }

  //check is data exist with sended uuid
  update(id: string, updatePostDto: UpdatePostDto) {
    const blog = this.postModel.findById(id)
    if (!blog) { return "blog its not exist" }
    const model = new this.postModel({ _id: id, ...updatePostDto });
    return model.save();
  }

  async remove(id: string) {
    return await this.postModel.deleteOne({ _id: id })
  }
}
