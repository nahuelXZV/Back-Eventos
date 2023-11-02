import { IsArray, IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { FotografoEntity } from "../entities/fotografo.entity";

export class UserCreateDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    apellido: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    direccion: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    tokenMobile: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsArray()
    role?: Array<string>;

    @IsOptional()
    @IsObject()
    fotografo?: FotografoEntity;

    @IsOptional()
    fotoUsuario?: Express.Multer.File[];
}

