import { UsersEntity } from "src/users/entities/users.entity";
import { EventoEntity } from "../entities/evento.entity";
import { PrecioEntity } from "../entities/precio.entity";

export interface IFotoEvento {
    nombre: string;
    extension: string;
    dirFotoCompresa: string;
    dirFotoNormal: string;
    evento: EventoEntity;
    precio: PrecioEntity;
    usuarios: UsersEntity[];
}
