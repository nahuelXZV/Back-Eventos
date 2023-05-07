import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateEventoFotografoDto {

    @IsNotEmpty()
    @IsString()
    fecha: string;

    @IsString()
    @IsUUID()
    evento: string;

    @IsString()
    @IsUUID()
    fotografo: string;
}
