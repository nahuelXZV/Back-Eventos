import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    async uploadFile(file: Express.Multer.File) {
        const { originalname } = file;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
    }

    async s3_upload(file, bucket: string, name: string, mimetype: string) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: mimetype,
            ContentDisposition: "inline",
            ACL: "public-read",
            CreateBucketConfiguration: { LocationConstraint: "us-east-2" }
        };
        try {
            let s3Response = await this.s3.upload(params).promise();
            console.log(s3Response);
            return s3Response;
        }
        catch (e) {
            console.log(e);
        }
    }
}