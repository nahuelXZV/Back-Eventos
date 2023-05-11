import { Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { Exclude } from "class-transformer";

import { BaseEntity } from "../../common/entities/base.entity";
import { IUser } from "../interfaces/user.interface";
import { FotografoEntity } from "./fotografo.entity";
import { RolEntity } from "./rol.entity";
import { FotoUsuarioEntity } from "./foto-usuario.entity";
import { TarjetaEntity } from "./tarjeta.entity";
import { UsuarioSuscripcionEntity } from "./usuario-suscripcion.entity";
import { FotoEventoEntity } from "../../eventos/entities/foto-evento.entity";
import { CompraFotoEventoEntity } from "../../eventos/entities/compra-foto-evento.entity";

@Entity({ name: 'user' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    isOrganizador: boolean;

    @Column({ nullable: true })
    tokenMobile: string;

    @OneToOne(() => FotografoEntity, fotografo => fotografo.usuario, { cascade: true })
    fotografo: FotografoEntity;

    @ManyToMany(() => RolEntity, rol => rol.usuarios)
    @JoinTable()
    roles: RolEntity[];

    @OneToMany(() => FotoUsuarioEntity, (photo) => photo.usuario)
    fotos: FotoUsuarioEntity[]

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.usuario)
    suscripciones: UsuarioSuscripcionEntity[];

    @OneToOne(() => TarjetaEntity, (tarjeta) => tarjeta.usuario)
    tarjeta: TarjetaEntity;

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.usuario)
    asistencias: any;

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.usuario)
    compras: any;

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.usuario)
    eventos: any;

    @ManyToMany(() => FotoEventoEntity, (foto) => foto.usuarios)
    fotosEventos: FotoEventoEntity[];

    @OneToMany(() => CompraFotoEventoEntity, (foto) => foto.usuario)
    fotosComprada: CompraFotoEventoEntity[];

}