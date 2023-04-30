import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import * as fs from 'fs';

export const fileNamer = (req: Request, file: Express.Multer.File, cb: Function) => {
    console.log('fileNamer', req.query);
    if (!file) return cb(new BadRequestException('No file uploaded'), false);
    if (!req.query.infractor_id) return cb(new BadRequestException('No hay el id del infractor.'), false);
    const id = req.query.infractor_id;
    const fileExtension = file.mimetype.split('/')[1];
    const originalname = file.originalname.split('.')[0];
    const fileName = `${id}_${originalname}.${fileExtension}`;
    cb(null, fileName);
}


