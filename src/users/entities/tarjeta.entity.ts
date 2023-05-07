import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { BaseEntity } from "../../common/entities/base.entity";
import { ITarjeta } from "../interfaces/tarjeta.interface";
import { UsersEntity } from "./users.entity";

@Entity({ name: 'tarjeta' })
export class TarjetaEntity extends BaseEntity implements ITarjeta {
    
    @Column()
    numero: string;
    
    @Column()
    nombre: string;
    
    @Column()
    fechaVencimiento: string;
    
    @Column()
    codigoSeguridad: string;
    
    @OneToOne(() => UsersEntity, (user) => user.tarjeta, { cascade: true })
    @JoinColumn()
    usuario: UsersEntity;
}
