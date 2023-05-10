import { UsersEntity } from "src/users/entities/users.entity";
import { EventoEntity } from "../entities/evento.entity";
import { FotografoEntity } from "src/users/entities/fotografo.entity";

export interface IFotoEvento {
    nombre: string;
    extension: string;
    dirFotoCompresa: string;
    dirFotoNormal: string;
    precioDigital: number;
    precioImpresa: number;
    evento: EventoEntity;
    fotografo: FotografoEntity;
    usuarios: UsersEntity[];
}
