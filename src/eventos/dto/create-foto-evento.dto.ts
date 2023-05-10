import { IsString, IsUUID } from "class-validator";

export class CreateFotoEventoDto {

    @IsUUID()
    @IsString()
    evento: string;

    @IsString()
    @IsUUID()
    fotografo: string;

    @IsString()
    precioDigital: string;

    @IsString()
    precioImpresa: string;

}
