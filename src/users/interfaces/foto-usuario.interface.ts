import { UsersEntity } from "../entities/users.entity";

export interface IFotoUsuario {
    nombre: string;
    extension: string;
    dir_foto_compresa: string;
    dir_foto_normal: string;
    usuario: UsersEntity;
}