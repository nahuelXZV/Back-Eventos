import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFotoEventoDto } from '../dto/create-foto-evento.dto';
import { FotoEventoEntity } from '../entities/foto-evento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/providers/s3/s3.service';
import { EventoService } from './evento.service';
import { UsersService } from 'src/users/services/users.service';
import { PrecioService } from './precio.service';
import { EventoEntity } from '../entities/evento.entity';
import { RecoknitionService } from 'src/providers/recoknition/recoknition.service';
import { UsersEntity } from 'src/users/entities/users.entity';
import { NotificationsService } from 'src/providers/notifications/notifications.service';

@Injectable()
export class FotoEventoService {
  private readonly logger = new Logger('FotoEventoService');

  constructor(
    @InjectRepository(FotoEventoEntity) private readonly fotoEventoRepository: Repository<FotoEventoEntity>,
    private readonly s3Service: S3Service,
    private readonly recoknitionService: RecoknitionService,
    private readonly eventoService: EventoService,
    private readonly usuarioService: UsersService,
    private readonly precioService: PrecioService,
    private readonly notificationService: NotificationsService
  ) { }


  async create(fotos: Array<Express.Multer.File>, createFotoEvento: CreateFotoEventoDto) {
    try {
      const { evento, fotografo, precioDigital, precioImpresa } = createFotoEvento;
      const eventoEntity = await this.eventoService.findOne(evento);
      const fotografoEntity = await this.usuarioService.findFotografos(fotografo);
      fotos.forEach(async (foto) => {
        const fotoUsuario = new FotoEventoEntity();
        const name = 'eventos/' + foto.originalname.split('.') + Date.now().toString();
        const compress = await this.s3Service.uploadFile(foto, 'compress', name);
        const normal = await this.s3Service.uploadFile(foto, 'normal', name);
        fotoUsuario.dirFotoNormal = normal.Location;
        fotoUsuario.dirFotoCompresa = compress.Location;
        fotoUsuario.nombre = foto.originalname;
        fotoUsuario.extension = foto.mimetype;
        fotoUsuario.precioDigital = +precioDigital;
        fotoUsuario.precioImpresa = +precioImpresa;
        fotoUsuario.evento = eventoEntity;
        fotoUsuario.fotografo = fotografoEntity;
        const newFoto = await this.fotoEventoRepository.save(fotoUsuario);
        const fotos = await this.recoknitionService.searchEventosUsuariosFaces(name);
        const usuariosId = this.getUsers(fotos);
        await this.asociarUsuarioFoto(newFoto, eventoEntity, usuariosId);
      });
      return { message: 'Fotos guardadas' };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(fotos: Array<Express.Multer.File>, user_id: string) {
  }

  async remove(id: string) {
    try {
      const fotoDeleted = await this.fotoEventoRepository.delete(id);
      if (fotoDeleted.affected === 0) throw new BadRequestException('No se pudo eliminar la foto');
      return { message: 'Foto eliminada' };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async find(evento: string) {
    try {
      const eventoDB: EventoEntity = await this.eventoService.findOne(evento);
      const fotos = await this.fotoEventoRepository.find({ where: { evento: { id: eventoDB.id } }, relations: ['fotografo', 'usuarios'] });
      return fotos;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string) {
    try {
      const foto = await this.fotoEventoRepository.findOne({ where: { id } });
      if (!foto) throw new BadRequestException('No se encontro la foto');
      return foto;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async test() {
    try {
      const fotos = await this.notificationService.sendNotification({ url: 'https://tus-recuerdos.vercel.app/eventos/', token: "fTEMf4FGQh67t-DT73TNob:APA91bFz1OnwkPL7zHubdRVKA62cCM4NJB6Ld6nff9QUIzzs8dG4X-NIUo5jBOcV9vSt6sWD4AMPhC3xrvZk3JS-O6BT5IeloZzcL8kZStcQO12xQEgiqtOAPDAeZi0u7e2_WoC2fxH0" });
      return fotos;
    } catch (error) {
      this.handlerError(error);
    }
  }

  extraerUUID(cadena: string) {
    const regex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/i; // La expresión regular busca un UUID
    const match = cadena.match(regex); // Busca la primera coincidencia
    if (match) {
      return match[0]; // Devuelve el UUID encontrado
    } else {
      return null; // Si no se encuentra ningún UUID, devuelve null
    }
  }

  eliminarDuplicados(array: string[]) {
    return [...new Set(array)];
  }

  getUsers(fotos: string[]) {
    const users = [];
    fotos.forEach((foto) => {
      const user = this.extraerUUID(foto);
      if (user) users.push(user);
    });
    return this.eliminarDuplicados(users);
  }

  async asociarUsuarioFoto(foto: FotoEventoEntity, evento: EventoEntity, usuarios: string[]) {
    const fotoEntity: FotoEventoEntity = await this.fotoEventoRepository.findOne({ where: { id: foto.id }, relations: ['usuarios'] });
    usuarios.forEach(async (usuario: string) => {
      const user: UsersEntity = await this.usuarioService.findOne(usuario);
      fotoEntity.usuarios.push(user);
      if (user.tokenMobile) await this.notificationService.sendNotification({ url: `https://tus-recuerdos.vercel.app/eventos/${evento.id}`, token: user.tokenMobile });
    });
    await this.fotoEventoRepository.save(fotoEntity);
  }

  handlerError(error: any) {
    this.logger.error(error.message);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(error.message);
  }
}
