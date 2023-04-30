import { FotografoEntity } from "src/users/entities/fotografo.entity";
import { EventoEntity } from "../entities/evento.entity";

export interface IEventoFotografo {
    fecha: Date;
    evento: EventoEntity;
    fotografo: FotografoEntity;
}
