import { UsersEntity } from "../entities/users.entity";

export interface IFotografo {
    tipo: string;
    direccion: string;
    correo_paypal?: string;
    usuario: UsersEntity;
}