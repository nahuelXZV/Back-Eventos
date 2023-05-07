import { Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";

import { BaseEntity } from "../../common/entities/base.entity";
import { IFotoUsuario } from "../interfaces/foto-usuario.interface";
import { UsersEntity } from "./users.entity";

@Entity({ name: 'foto_usuario' })
export class FotoUsuarioEntity extends BaseEntity implements IFotoUsuario {

    @Column()
    nombre: string;

    @Column()
    extension: string;

    @Column()
    dir_foto_compresa: string;

    @Column()
    dir_foto_normal: string;

    @ManyToOne(() => UsersEntity, (user) => user.fotos, { cascade: true })
    usuario: UsersEntity;
}