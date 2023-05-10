import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
import * as sharp from 'sharp';
import * as UUID from "uuid";

@Injectable()
export class S3Service {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });


    async uploadFile(file: Express.Multer.File, type: string, carpeta: string = '') {
        const { originalname } = file;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype, type, carpeta);
    }

    async s3_upload(file: any, bucket: string, name: string, mimetype: string, type: string, carpeta: string = '') {
        const contentConfiguration = type == 'compress' ? 'inline' : 'attachment';
        if (type == 'compress') {
            file = await sharp(file).resize({ width: 1000 }).jpeg({ quality: 80 }).toBuffer();
        }
        const params = {
            Bucket: bucket,
            Key: String(carpeta + name + "-" + UUID.v4()),
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
}