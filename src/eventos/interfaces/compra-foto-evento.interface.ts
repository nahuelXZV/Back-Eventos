import { UsersEntity } from "../../users/entities/users.entity";
import { CompraEntity } from "../entities/compra.entity";
import { FotoEventoEntity } from "../entities/foto-evento.entity";

export interface ICompraFotoEvento {
    formatoFoto: string;
    cantidad: number;
    precio: number;
    compra: CompraEntity;
    fotoEvento: FotoEventoEntity;
    usuario: UsersEntity;
}
