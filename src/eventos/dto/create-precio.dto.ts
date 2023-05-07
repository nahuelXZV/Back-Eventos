import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { IPrecio } from "../interfaces/precio.interface";

export class CreatePrecioDto implements IPrecio {

    @IsString()
    @IsNotEmpty()
    formato: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNotEmpty()
    @IsPositive()
    precio: number;
}