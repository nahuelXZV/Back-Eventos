import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
import * as sharp from 'sharp';

@Injectable()
export class S3Service {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    async uploadFile(file: Express.Multer.File, type: string, name: string = '') {
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, name, file.mimetype, type);
    }

    async s3_upload(file: any, bucket: string, name: string, mimetype: string, type: string) {
        const contentConfiguration = type == 'compress' ? 'inline' : 'attachment';
        if (type == 'compress') {
            file = await sharp(file).resize({ width: 1000 }).jpeg({ quality: 80 }).toBuffer();
            name = name + "| Compress";
        }
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: mimetype,
            ContentDisposition: contentConfiguration,
            ACL: "public-read",
            CreateBucketConfiguration: { LocationConstraint: "us-east-2" }
        };
        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async getUsuariosImages(): Promise<string[]> {
        const params: AWS.S3.ListObjectsV2Request = {
            Bucket: process.env.AWS_S3_BUCKET,
            Prefix: 'usuarios/',
        };
        const result = await this.s3.listObjectsV2(params).promise();
        return result.Contents?.map((obj) => obj.Key) || [];
    }
}