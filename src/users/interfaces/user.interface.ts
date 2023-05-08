import { FotoEventoEntity } from "src/eventos/entities/foto-evento.entity";
import { FotoUsuarioEntity } from "../entities/foto-usuario.entity";
import { FotografoEntity } from "../entities/fotografo.entity";
import { RolEntity } from "../entities/rol.entity";
import { TarjetaEntity } from "../entities/tarjeta.entity";
import { UsuarioSuscripcionEntity } from "../entities/usuario-suscripcion.entity";
import { CompraFotoEventoEntity } from "src/eventos/entities/compra-foto-evento.entity";

export interface IUser {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    isOrganizador: boolean;
    fotografo?: FotografoEntity;
    fotos?: FotoUsuarioEntity[];
    roles?: RolEntity[];
    tarjeta?: TarjetaEntity;
    suscripciones?: UsuarioSuscripcionEntity[];
    fotoEventos?: FotoEventoEntity[];
    fotosComprada: CompraFotoEventoEntity[];
}