import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { ICompra } from "../interfaces/compra.interface";
import { CompraFotoEventoEntity } from "./compra-foto-evento.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { EventoEntity } from "./evento.entity";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity('compra')
export class CompraEntity extends BaseEntity implements ICompra {

    @Column()
    fecha: Date;

    @Column({ type: 'float' })
    montoTotal: number;

    @Column()
    metodoPago: string;

    @ManyToOne(() => UsersEntity, (usuario) => usuario.compras)
    usuario: UsersEntity;

    @ManyToOne(() => EventoEntity, (evento) => evento.compras)
    evento: EventoEntity;

    @OneToMany(() => CompraFotoEventoEntity, (compra) => compra.compra)
    fotos: CompraFotoEventoEntity[];

}
