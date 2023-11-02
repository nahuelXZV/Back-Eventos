import { Entity, JoinColumn, OneToOne } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";

import { BaseEntity } from "../../common/entities/base.entity";
import { IFotografo } from "../interfaces/fotografo.interface";
import { UsersEntity } from "./users.entity";

@Entity({ name: 'fotografo' })
export class FotografoEntity extends BaseEntity implements IFotografo {

    @Column()
    tipo: string;

    @Column()
    direccion: string;

    @Column({ nullable: true })
    telefono: string;

    @Column({ nullable: true })
    correo_paypal?: string;

    @OneToOne(() => UsersEntity, user => user.fotografo)
    @JoinColumn()
    usuario: UsersEntity;
    fotosEventos: any;
}