import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { CreateCompraFotoEventoDto } from "./create-compra-foto-evento.dto";

export class CreateCompraDto {

    @IsNotEmpty()
    @IsString()
    fecha: string;

    @IsNotEmpty()
    montoTotal: number;

    @IsNotEmpty()
    @IsString()
    usuario: string;

    @IsNotEmpty()
    @IsString()
    evento: string;

    @IsNotEmpty()
    fotos: CreateCompraFotoEventoDto[];
}
