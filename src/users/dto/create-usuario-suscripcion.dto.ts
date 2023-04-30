import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUsuarioSuscripcionDto {

    @IsNumber()
    monto: number;

    @IsDate()
    fechaInicio: Date;

    @IsDate()
    fechaFin: Date;

    @IsString()
    @IsNotEmpty()
    usuario: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsString()
    @IsNotEmpty()
    suscripcion: string;
}
