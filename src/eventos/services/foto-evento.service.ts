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
      const { evento, fotografo, precio } = createFotoEvento;
      const eventoEntity = await this.eventoService.findOne(evento);
      const fotografoEntity = await this.usuarioService.findFotografos(fotografo);
      const precioEntity = await this.precioService.findOne(precio);
      fotos.forEach(async (foto) => {
        const fotoUsuario = new FotoEventoEntity();
        const response = await this.s3Service.uploadFile(foto);
        fotoUsuario.dirFotoNormal = response.Location;
        fotoUsuario.dirFotoCompresa = response.Location;
        fotoUsuario.nombre = foto.originalname;
        fotoUsuario.extension = foto.mimetype;
        fotoUsuario.evento = eventoEntity;
        fotoUsuario.precio = precioEntity;
        fotoUsuario.fotografo = fotografoEntity;
        await this.fotoEventoRepository.save(fotoUsuario);
      });
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
      const fotos = await this.fotoEventoRepository.find({ where: { evento: { id: eventoDB.id } }, relations: ['fotografo', 'precio'] });
      return fotos;
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
