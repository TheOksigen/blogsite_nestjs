import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileStorageService {
  private readonly s3Client: S3Client;
  private readonly _bucketName: string = this.configService.get('AWS_S3_BUCKET_NAME');

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  get bucketName(): string {
    return this._bucketName;
  }

  get fileUrl(): string {
    return `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/`;
  }

  async saveFile(Key: string, file: Express.Multer.File) {
    await this.s3Client.send(new PutObjectCommand({
      Bucket: this.bucketName,
      Key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
    }));
    let img = { img_url  :`${this.fileUrl}${Key}` }
    return img;
  }
}
