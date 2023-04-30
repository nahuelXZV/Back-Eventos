import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

import { IFotoEvento } from "../interfaces/foto-evento.interface";
import { EventoEntity } from "./evento.entity";
import { PrecioEntity } from "./precio.entity";
import { BaseEntity } from "../../common/entities/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";

@Entity('foto_evento')
export class FotoEventoEntity extends BaseEntity implements IFotoEvento {

    @Column()
    nombre: string;

    @Column()
    extension: string;

    @Column()
    dirFotoCompresa: string;

    @Column()
    dirFotoNormal: string;

    @ManyToOne(() => EventoEntity, evento => evento.fotos)
    evento: EventoEntity;

    @ManyToOne(() => PrecioEntity)
    precio: PrecioEntity;

    @ManyToMany(() => UsersEntity, user => user.fotosEventos)
    @JoinTable()
    usuarios: UsersEntity[];
}
