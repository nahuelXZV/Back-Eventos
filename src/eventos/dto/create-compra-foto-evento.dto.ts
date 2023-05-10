import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateCompraFotoEventoDto {

    @IsNotEmpty()
    @IsString()
    formatoFoto: string;

    @IsNotEmpty()
    @IsPositive()
    cantidad: number;

    @IsNotEmpty()
    @IsPositive()
    precio: number;

    @IsNotEmpty()
    @IsString()
    fotoEvento: string;
}
