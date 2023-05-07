import { Column, Entity, ManyToOne } from "typeorm";

import { FotografoEntity } from "../../users/entities/fotografo.entity";
import { IEventoFotografo } from "../interfaces/evento-fotografo.interface";
import { EventoEntity } from "./evento.entity";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity('evento_fotografo')
export class EventoFotografoEntity extends BaseEntity implements IEventoFotografo {
    @Column()
    fecha: string;

    @ManyToOne(() => EventoEntity, evento => evento.fotografos, { cascade: true })
    evento: EventoEntity;

    @ManyToOne(() => FotografoEntity, fotografo => '', { cascade: true })
    fotografo: FotografoEntity;
}
