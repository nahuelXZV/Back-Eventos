import { Entity, JoinTable, ManyToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";

import { BaseEntity } from "../../common/entities/base.entity";
import { IRol } from "../interfaces/rol.interface";
import { UsersEntity } from "./users.entity";

@Entity({ name: 'rol' })
export class RolEntity extends BaseEntity implements IRol {

    @Column()
    nombre: string;

    @ManyToMany(() => UsersEntity, usuario => usuario.roles)
    @JoinTable()
    usuarios: UsersEntity[];
}