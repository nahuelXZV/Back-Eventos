import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

import { IFotoEvento } from "../interfaces/foto-evento.interface";
import { EventoEntity } from "./evento.entity";
import { BaseEntity } from "../../common/entities/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { FotografoEntity } from "../../users/entities/fotografo.entity";

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

    @Column()
    precioDigital: number;

    @Column()
    precioImpresa: number;

    @ManyToOne(() => EventoEntity, evento => evento.fotos, { cascade: true })
    evento: EventoEntity;

    @ManyToOne(() => FotografoEntity, fotografo => fotografo.fotosEventos, { cascade: true })
    fotografo: FotografoEntity;

    @ManyToMany(() => UsersEntity, user => user.fotosEventos, { cascade: true })
    @JoinTable()
    usuarios: UsersEntity[];
}
