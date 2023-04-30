import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTarjetaDto {

    @IsString()
    @IsNotEmpty()
    numero: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    fechaVencimiento: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(3)
    codigoSeguridad: string;

    @IsString()
    @IsNotEmpty()
    usuario: string;
}
