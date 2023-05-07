import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateEventoDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    hora: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    tipoEvento: string;

    @IsString()
    @IsNotEmpty()
    privacidadFotos: string;

    @IsString()
    @IsNotEmpty()
    ubicacionGoogleMaps: string;

    @IsString()
    @IsNotEmpty()
    usuario: string;
}
