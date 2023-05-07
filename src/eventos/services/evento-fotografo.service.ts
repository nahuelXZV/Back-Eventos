import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateEventoFotografoDto } from '../dto/create-evento-fotografo.dto';
import { UpdateEventoFotografoDto } from '../dto/update-evento-fotografo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoFotografoEntity } from '../entities/evento-fotografo.entity';
import { EventoService } from './evento.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class EventoFotografoService {

  private readonly logger = new Logger('EventoFotografoService');

  constructor(
    @InjectRepository(EventoFotografoEntity) private readonly EventoFotografoRepository: Repository<EventoFotografoEntity>,
    private readonly eventoService: EventoService,
    private readonly userService: UsersService,
  ) { }


  async create(createEventoFotografoDto: CreateEventoFotografoDto) {
    try {
      const { evento, fotografo, fecha } = createEventoFotografoDto;
      const eventoEntity = await this.eventoService.findOne(evento);
      const fotografoEntity = await this.userService.findFotografos(fotografo);
      const eventoFotografo = new EventoFotografoEntity();
      eventoFotografo.evento = eventoEntity;
      eventoFotografo.fotografo = fotografoEntity;
      eventoFotografo.fecha = fecha;
      const eventoFotografoSaved = await this.EventoFotografoRepository.save(eventoFotografo);
      return eventoFotografoSaved;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findAll() {
    try {
      const eventoFotografo = await this.EventoFotografoRepository.find({ relations: ['evento', 'fotografo'] });
      return eventoFotografo;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string) {
    try {
      const eventoFotografo = await this.EventoFotografoRepository.findOne({ where: { id: id }, relations: ['evento', 'fotografo'] });
      return eventoFotografo;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findFotografoByEvento(key: any, value: string) {
    try {
      console.log(key);
      console.log(value);
      const eventoFotografo = await this.EventoFotografoRepository.createQueryBuilder('eventoFotografo').leftJoinAndSelect('eventoFotografo.fotografo', 'fotografo').leftJoinAndSelect('eventoFotografo.evento', 'evento').leftJoinAndSelect('fotografo.usuario', 'usuario').where({ [key]: value }).getMany();
      return eventoFotografo;
    } catch (error) {
      this.handlerError(error);
    }
  }

  update(id: string, updateEventoFotografoDto: UpdateEventoFotografoDto) {
    return `This action updates a #${id} eventoFotografo`;
  }

  async remove(id: string) {
    try {
      const eventoFotografo = await this.EventoFotografoRepository.delete(id);
      if (eventoFotografo.affected === 0) throw new BadRequestException('No se ha borrado el eventoFotografo');
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
