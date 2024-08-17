import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({   
    timestamps: true,
})
export class Post {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    img_url: string;

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date
}

export const PostSchema = SchemaFactory.createForClass(Post);