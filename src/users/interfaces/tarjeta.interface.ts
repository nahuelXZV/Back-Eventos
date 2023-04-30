import { UsersEntity } from "../entities/users.entity";

export interface ITarjeta { 
    numero: string;
    nombre: string;
    fechaVencimiento: string;
    codigoSeguridad: string;
    usuario: UsersEntity;
}