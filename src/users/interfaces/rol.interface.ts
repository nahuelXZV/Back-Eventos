import { UsersEntity } from "../entities/users.entity";

export interface IRol {
    nombre: string;
    usuarios: UsersEntity[];
}