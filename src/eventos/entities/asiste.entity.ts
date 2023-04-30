import { Column, Entity, ManyToOne } from "typeorm";

import { UsersEntity } from "../../users/entities/users.entity";
import { IAsiste } from "../interfaces/asiste.interface";
import { EventoEntity } from "./evento.entity";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity('asiste')
export class AsisteEntity extends BaseEntity implements IAsiste {

    @Column()
    fecha_aceptado: Date;

    @ManyToOne(() => EventoEntity, evento => evento.asistentes)
    evento: EventoEntity;

    @ManyToOne(() => UsersEntity)
    usuario: UsersEntity;
}
