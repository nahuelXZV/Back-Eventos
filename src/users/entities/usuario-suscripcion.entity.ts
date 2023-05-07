import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "../../common/entities/base.entity";
import { IUsuarioSuscripcion } from "../interfaces/usuario-suscripcion.interface";
import { SuscripcionEntity } from "./suscripcion.entity";
import { UsersEntity } from "./users.entity";

@Entity({ name: 'usuario_suscripcion' })
export class UsuarioSuscripcionEntity extends BaseEntity implements IUsuarioSuscripcion {

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'float', default: 0 })
    monto: number;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @ManyToOne(() => UsersEntity, (user) => user.suscripciones, { cascade: true })
    usuario: UsersEntity;

    @ManyToOne(() => SuscripcionEntity, (suscripcion) => suscripcion.usuarios, { cascade: true })
    suscripcion: SuscripcionEntity;
}
