import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAsisteDto {

    @IsString()
    @IsNotEmpty()
    fecha_aceptado: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    evento: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    usuario: string;
}
