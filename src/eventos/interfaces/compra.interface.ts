import { UsersEntity } from "src/users/entities/users.entity";
import { CompraFotoEventoEntity } from "../entities/compra-foto-evento.entity";
import { EventoEntity } from "../entities/evento.entity";

export interface ICompra {
    fecha: string;
    montoTotal: number;
    usuario: UsersEntity;
    evento: EventoEntity;
    fotos: CompraFotoEventoEntity[];
}
