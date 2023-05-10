import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCompraDto } from '../dto/create-compra.dto';
import { UpdateCompraDto } from '../dto/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompraEntity } from '../entities/compra.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/services/users.service';
import { EventoService } from './evento.service';
import { CompraFotoEventoEntity } from '../entities/compra-foto-evento.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { EventoEntity } from '../entities/evento.entity';
import { EventoFotografoService } from './evento-fotografo.service';
import { CreateCompraFotoEventoDto } from '../dto/create-compra-foto-evento.dto';
import { FotoEventoEntity } from '../entities/foto-evento.entity';
import { FotoEventoService } from './foto-evento.service';

@Injectable()
export class CompraService {

  private readonly logger = new Logger('CompraService');

  constructor(
    @InjectRepository(CompraEntity) private readonly compraRepository: Repository<CompraEntity>,
    @InjectRepository(CompraFotoEventoEntity) private readonly compraFotoRepository: Repository<CompraFotoEventoEntity>,
    private readonly userService: UsersService,
    private readonly eventoFotoService: FotoEventoService,
    private readonly eventoService: EventoService,
  ) { }

  async create(createCompraDto: CreateCompraDto) {
    try {
      const { usuario, evento, fotos, ...resto } = createCompraDto;
      const usuarioEntity: UsersEntity = await this.userService.findOne(usuario);
      const eventoEntity: EventoEntity = await this.eventoService.findOne(evento);
      const compraEntity: CompraEntity = await this.compraRepository.save({ ...resto, usuario: usuarioEntity, evento: eventoEntity });
      const compraNew: CompraEntity = await this.compraRepository.findOne({ where: { id: compraEntity.id } });
      fotos.forEach(async (foto: CreateCompraFotoEventoDto) => {
        const { fotoEvento, ...resto } = foto;
        const fotoEventoEntity: FotoEventoEntity = await this.eventoFotoService.findOne(fotoEvento);
        await this.compraFotoRepository.save({ ...resto, compra: compraNew, usuario: usuarioEntity, fotoEvento: fotoEventoEntity });
      });
      return compraNew;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findAll() {
    try {
      return await this.compraRepository.find({ relations: ['usuario', 'evento', 'fotos', 'fotos.fotoEvento'] });
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.compraRepository.findOne({ where: { id }, relations: ['usuario', 'evento', 'fotos', 'fotos.fotoEvento'] });
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findCompraBy(key: any, value: string, limit?: number) {
    try {
      if (limit) {
        const compras = await this.compraRepository.createQueryBuilder('compra').leftJoinAndSelect('compra.usuario', 'usuario').leftJoinAndSelect('compra.evento', 'evento').leftJoinAndSelect('compra.fotos', 'fotos').leftJoinAndSelect('fotos.fotoEvento', 'fotoEvento').where({ [key]: value }).take(limit).getMany();
        return compras;
      }
      const compras = await this.compraRepository.createQueryBuilder('compra').leftJoinAndSelect('compra.usuario', 'usuario').leftJoinAndSelect('compra.evento', 'evento').leftJoinAndSelect('compra.fotos', 'fotos').leftJoinAndSelect('fotos.fotoEvento', 'fotoEvento').where({ [key]: value }).getMany();
      return compras;
    } catch (error) {
      this.handlerError(error);
    }
  }

  // buscar una compra por el evento
  async findCompraByEvento(idEvento: string, idUsuario: string) {
    try {
      const compras = await this.compraRepository.createQueryBuilder('compra').leftJoinAndSelect('compra.usuario', 'usuario').leftJoinAndSelect('compra.evento', 'evento').leftJoinAndSelect('compra.fotos', 'fotos').leftJoinAndSelect('fotos.fotoEvento', 'fotoEvento').where({ evento: idEvento, usuario: idUsuario }).getMany();
      return compras;
    } catch (error) {
      this.handlerError(error);
    }
  }

  update(id: string, updateCompraDto: UpdateCompraDto) {
    return `This action updates a #${id} compra`;
  }

  async remove(id: string) {
    try {
      const compraDeleted = await this.compraRepository.delete(id);
      if (compraDeleted.affected === 0) throw new BadRequestException('No se ha borrado ninguna compra');
      return { deleted: true };
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
