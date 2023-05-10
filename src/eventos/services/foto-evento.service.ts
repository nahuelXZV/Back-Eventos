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

@Injectable()
export class FotoEventoService {
  private readonly logger = new Logger('FotoEventoService');

  constructor(
    @InjectRepository(FotoEventoEntity) private readonly fotoEventoRepository: Repository<FotoEventoEntity>,
    private readonly s3Service: S3Service,
    private readonly eventoService: EventoService,
    private readonly usuarioService: UsersService,
    private readonly precioService: PrecioService
  ) { }


  async create(fotos: Array<Express.Multer.File>, createFotoEvento: CreateFotoEventoDto) {
    try {
      const { evento, fotografo, precioDigital, precioImpresa } = createFotoEvento;
      const eventoEntity = await this.eventoService.findOne(evento);
      const fotografoEntity = await this.usuarioService.findFotografos(fotografo);
      fotos.forEach(async (foto) => {
        const fotoUsuario = new FotoEventoEntity();
        const compress = await this.s3Service.uploadFile(foto, 'compress', 'eventos/');
        const normal = await this.s3Service.uploadFile(foto, 'normal', 'eventos/');
        fotoUsuario.dirFotoNormal = normal.Location;
        fotoUsuario.dirFotoCompresa = compress.Location;
        fotoUsuario.nombre = foto.originalname;
        fotoUsuario.extension = foto.mimetype;
        fotoUsuario.precioDigital = +precioDigital;
        fotoUsuario.precioImpresa = +precioImpresa;
        fotoUsuario.evento = eventoEntity;
        fotoUsuario.fotografo = fotografoEntity;
        await this.fotoEventoRepository.save(fotoUsuario);
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

  handlerError(error: any) {
    this.logger.error(error.message);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(error.message);
  }
}
