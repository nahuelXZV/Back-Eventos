import { SuscripcionEntity } from "../entities/suscripcion.entity";
import { UsersEntity } from "../entities/users.entity";

export interface IUsuarioSuscripcion {
    isActive: boolean;
    monto: number;
    fechaInicio: Date;
    fechaFin: Date;
    usuario: UsersEntity;
    suscripcion: SuscripcionEntity
}