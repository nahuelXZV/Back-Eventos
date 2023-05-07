import { UsersEntity } from "src/users/entities/users.entity";
import { EventoFotografoEntity } from "../entities/evento-fotografo.entity";
import { CompraEntity } from "../entities/compra.entity";
import { AsisteEntity } from "../entities/asiste.entity";
import { FotoEventoEntity } from "../entities/foto-evento.entity";

export interface IEvento {
    nombre: string;
    fecha: string;
    hora: string;
    direccion: string;
    descripcion: string;
    tipoEvento: string;
    privacidadFotos: string;
    ubicacionGoogleMaps: string;
    usuario: UsersEntity;
    asistentes: AsisteEntity[];
    compras: CompraEntity[];
    fotografos: EventoFotografoEntity[];
    fotos: FotoEventoEntity[];
}
