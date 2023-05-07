import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAsisteDto } from '../dto/create-asiste.dto';
import { UpdateAsisteDto } from '../dto/update-asiste.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsisteEntity } from '../entities/asiste.entity';
import { EventoService } from './evento.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AsisteService {

  private readonly logger = new Logger('AsisteService');

  constructor(
    @InjectRepository(AsisteEntity) private readonly asisteRepository: Repository<AsisteEntity>,
    private readonly eventoService: EventoService,
    private readonly usersService: UsersService,
  ) { }


  async create(createAsisteDto: CreateAsisteDto) {
    try {
      const { evento, usuario, fecha_aceptado } = createAsisteDto;
      const eventoEntity = await this.eventoService.findOne(evento);
      const usuarioEntity = await this.usersService.findOne(usuario);
      const asiste = new AsisteEntity();
      asiste.evento = eventoEntity;
      asiste.usuario = usuarioEntity;
      asiste.fecha_aceptado = fecha_aceptado;
      const asisteSaved = await this.asisteRepository.save(asiste);
      return asisteSaved;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findAll() {
    try {
      const asiste = await this.asisteRepository.find({ relations: ['evento', 'usuario'] });
      return asiste;

    } catch (error) {
      this.handlerError(error);
    }
  }

  findOne(id: string) {
    try {
      const asiste = this.asisteRepository.findOne({ where: { id: id }, relations: ['evento', 'usuario'] });
      return asiste;
    } catch (error) {
      this.handlerError(error);
    }
  }

  update(id: string, updateAsisteDto: UpdateAsisteDto) {
  }


  async findAsisteBy(key: any, value: string) {
    try {
      const asistentes = await this.asisteRepository.createQueryBuilder('asiste').leftJoinAndSelect('asiste.evento', 'evento').leftJoinAndSelect('asiste.usuario', 'usuario').where({ [key]: value }).getMany();
      return asistentes;
    } catch (error) {
      this.handlerError(error);
    }
  }

  remove(id: string) {
    try {
      const asisteDeleted = this.asisteRepository.delete(id);
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
