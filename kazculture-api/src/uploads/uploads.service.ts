import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

@Injectable()
export class UploadsService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('minio.endpoint'),
      port: this.configService.get('minio.port'),
      useSSL: this.configService.get('minio.useSSL'),
      accessKey: this.configService.get('minio.accessKey'),
      secretKey: this.configService.get('minio.secretKey'),
    });

    this.bucketName = this.configService.get('minio.bucketName');
    this.ensureBucketExists();
  }

  private async ensureBucketExists(): Promise<void> {
    try {
      const exists = await this.minioClient.bucketExists(this.bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
        console.log(`Bucket '${this.bucketName}' created successfully`);
      }
    } catch (error) {
      console.error('Error ensuring bucket exists:', error);
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: 'images' | 'videos' = 'images',
  ): Promise<UploadResult> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    const allowedImageTypes = this.configService.get(
      'upload.allowedImageTypes',
    );
    const allowedVideoTypes = this.configService.get(
      'upload.allowedVideoTypes',
    );
    const maxFileSize = this.configService.get('upload.maxFileSize');

    if (file.size > maxFileSize) {
      throw new BadRequestException('File too large');
    }

    if (folder === 'images' && !allowedImageTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid image file type');
    }

    if (folder === 'videos' && !allowedVideoTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid video file type');
    }

    // Generate unique filename
    const fileExtension = file.originalname.split('.').pop();
    const filename = `${folder}/${uuidv4()}.${fileExtension}`;

    try {
      // Upload to MinIO
      await this.minioClient.putObject(
        this.bucketName,
        filename,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        },
      );

      // Generate public URL
      const url = await this.minioClient.presignedGetObject(
        this.bucketName,
        filename,
        24 * 60 * 60,
      ); // 24 hours

      return {
        url,
        filename,
        size: file.size,
        mimetype: file.mimetype,
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      await this.minioClient.removeObject(this.bucketName, filename);
    } catch (error) {
      throw new BadRequestException('Failed to delete file');
    }
  }

  async getFileUrl(filename: string): Promise<string> {
    try {
      return await this.minioClient.presignedGetObject(
        this.bucketName,
        filename,
        24 * 60 * 60,
      );
    } catch (error) {
      throw new BadRequestException('Failed to get file URL');
    }
  }
}
