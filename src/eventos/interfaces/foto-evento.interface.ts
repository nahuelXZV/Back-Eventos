import { UsersEntity } from "src/users/entities/users.entity";
import { EventoEntity } from "../entities/evento.entity";
import { PrecioEntity } from "../entities/precio.entity";
import { FotografoEntity } from "src/users/entities/fotografo.entity";

export interface IFotoEvento {
    nombre: string;
    extension: string;
    dirFotoCompresa: string;
    dirFotoNormal: string;
    evento: EventoEntity;
    precio: PrecioEntity;
    fotografo: FotografoEntity;
    usuarios: UsersEntity[];
}
