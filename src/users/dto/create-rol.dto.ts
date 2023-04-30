import { IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateRolDto {

    @Column()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}
