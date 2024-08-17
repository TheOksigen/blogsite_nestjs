import { Module } from '@nestjs/common';
import { FileStorageService } from './file_storage.service';

@Module({
    providers: [FileStorageService],
    exports: [FileStorageService],
})
export class FileStorageModule {}
