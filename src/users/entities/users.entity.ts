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

    @OneToOne(() => FotografoEntity, fotografo => fotografo.usuario, { eager: true })
    fotografo: FotografoEntity;

    @ManyToMany(() => RolEntity, rol => rol.usuarios, { eager: true })
    @JoinTable()
    roles: RolEntity[];

    @OneToMany(() => FotoUsuarioEntity, (photo) => photo.usuario)
    fotos: FotoUsuarioEntity[]

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.usuario)
    suscripciones: UsuarioSuscripcionEntity[];

    @OneToOne(() => TarjetaEntity, (tarjeta) => tarjeta.usuario)

    @OneToOne(() => TarjetaEntity, (tarjeta) => tarjeta.usuario)
    tarjeta: TarjetaEntity;

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.usuario)
    asistencias: any;

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.usuario)
    compras: any;

    @OneToMany(() => UsuarioSuscripcionEntity, (usuarioSuscripcion) => usuarioSuscripcion.usuario)
    eventos: any;

    @ManyToMany(() => FotoEventoEntity, (foto) => foto.usuarios)
    @JoinTable()
    fotosEventos: FotoEventoEntity[];

}