import { Column, Entity, ManyToOne } from "typeorm";

import { ICompraFotoEvento } from "../interfaces/compra-foto-evento.interface";
import { CompraEntity } from "./compra.entity";
import { FotoEventoEntity } from "./foto-evento.entity";
import { BaseEntity } from "../../common/entities/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";

@Entity('compra_foto_evento')
export class CompraFotoEventoEntity extends BaseEntity implements ICompraFotoEvento {

    @Column()
    formatoFoto: string;

    @Column()
    cantidad: number;

    @Column({ type: 'float' })
    precio: number;

    @ManyToOne(() => UsersEntity, usuario => usuario.fotosComprada, { cascade: true })
    usuario: UsersEntity;

    @ManyToOne(() => CompraEntity, compra => compra.fotos, { cascade: true })
    compra: CompraEntity;

    @ManyToOne(() => FotoEventoEntity, fotoEvento => '', { cascade: true })
    fotoEvento: FotoEventoEntity;
}
