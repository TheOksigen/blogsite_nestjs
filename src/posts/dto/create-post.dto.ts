import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @ApiProperty({ default: "https://assets.kyivindependent.com/content/images/2024/08/GettyImages-2166040844-1.webp" })
    @IsNotEmpty()
    @IsString()  
    img_url: string

    @ApiProperty({ default: "Cersent" })
    @IsNotEmpty()
    @IsString() 
    title: string;

    @ApiProperty({ default: "lorem20" })
    @IsNotEmpty()
    @IsString()
    description: string;
}