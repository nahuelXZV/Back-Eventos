import { Column, Entity } from "typeorm";

import { IPrecio } from "../interfaces/precio.interface";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity('precio')
export class PrecioEntity extends BaseEntity implements IPrecio {

    @Column({ type: 'float' })
    precio: number;

    @Column()
    formato: string;

    @Column()
    descripcion: string;
    fotosEventos: any;
}