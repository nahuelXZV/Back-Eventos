import { UsuarioSuscripcionEntity } from "../entities/usuario-suscripcion.entity";

export interface ISuscripcion {
    nombre: string;
    descripcion: string;
    precio: number;
    duracion: number;
    isActiva: boolean;
    tipo: string;
    usuarios: UsuarioSuscripcionEntity[]
}