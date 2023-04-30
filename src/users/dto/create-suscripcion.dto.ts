import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSuscripcionDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @IsNotEmpty()
    @IsNumber()
    duracion: number;


    @IsBoolean()
    isActiva: boolean;

    @IsString()
    @IsNotEmpty()
    tipo: string;
}
