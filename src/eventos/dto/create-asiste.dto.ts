import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAsisteDto {

    @IsString()
    @IsNotEmpty()
    fecha_aceptado: string;

    @IsString()
    hora_ingreso: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    evento: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    usuario: string;
}
