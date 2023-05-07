import { IsString, IsUUID } from "class-validator";

export class CreateFotoEventoDto {

    @IsUUID()
    @IsString()
    evento: string;

    @IsString()
    @IsUUID()
    fotografo: string;

    @IsString()
    @IsUUID()
    precio: string;
}
