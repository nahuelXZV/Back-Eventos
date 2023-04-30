import { BadRequestException } from "@nestjs/common";
import { Request } from "express";

export const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if (!file) return cb(new BadRequestException('No file uploaded'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const validExtension = ['jpg', 'jpeg', 'png', 'gif'];
    if (!validExtension.includes(fileExtension)) return cb(new BadRequestException('Invalid file type'), false);
    cb(null, true);
}