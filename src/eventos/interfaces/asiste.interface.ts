import { UsersEntity } from "src/users/entities/users.entity";
import { EventoEntity } from "../entities/evento.entity";

export interface IAsiste {
    fecha_aceptado: string;
    evento: EventoEntity;
    usuario: UsersEntity;
}
