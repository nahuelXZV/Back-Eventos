import { Column, Entity, OneToMany } from "typeorm";

import { ISuscripcion } from "../interfaces/suscripcion.interface";
import { BaseEntity } from "../../common/entities/base.entity";
import { UsuarioSuscripcionEntity } from "./usuario-suscripcion.entity";

@Entity({ name: 'suscripcion' })
export class SuscripcionEntity extends BaseEntity implements ISuscripcion {

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    precio: number;

    @Column()
    duracion: number;

    @Column({ default: true })
    isActiva: boolean;

    @Column()
    tipo: string;

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.suscripcion)
    usuarios: UsuarioSuscripcionEntity[];
}
