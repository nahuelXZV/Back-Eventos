import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { UsersEntity } from "../../users/entities/users.entity";
import { IEvento } from "../interfaces/evento.interface";
import { AsisteEntity } from "./asiste.entity";
import { CompraEntity } from "./compra.entity";
import { EventoFotografoEntity } from "./evento-fotografo.entity";
import { FotoEventoEntity } from "./foto-evento.entity";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity('evento')
export class EventoEntity extends BaseEntity implements IEvento {

    @Column()
    nombre: string;

    @Column()
    fecha: Date;

    @Column({ type: 'time' })
    hora: string;

    @Column()
    direccion: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column()
    tipoEvento: string;

    @Column()
    privacidadFotos: string;

    @Column()
    ubicacionGoogleMaps: string;

    @ManyToOne(() => UsersEntity, (usuario) => usuario.eventos)
    usuario: UsersEntity;

    @OneToMany(() => AsisteEntity, (asiste) => asiste.evento)
    asistentes: AsisteEntity[];

    @OneToMany(() => CompraEntity, (compra) => compra.evento)
    compras: CompraEntity[];

    @OneToMany(() => EventoFotografoEntity, (eventoFotografo) => eventoFotografo.evento)
    fotografos: EventoFotografoEntity[];

    @OneToMany(() => FotoEventoEntity, (eventoFotografo) => eventoFotografo.evento)
    fotos: FotoEventoEntity[];
}
