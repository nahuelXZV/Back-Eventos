import { UsersEntity } from "src/users/entities/users.entity";
import { CompraFotoEventoEntity } from "../entities/compra-foto-evento.entity";
import { EventoEntity } from "../entities/evento.entity";

export interface ICompra {
    fecha: Date;
    montoTotal: number;
    metodoPago: string;
    usuario: UsersEntity;
    evento: EventoEntity;
    fotos: CompraFotoEventoEntity[];
}
