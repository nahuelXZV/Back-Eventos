import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateEventoDto } from '../dto/create-evento.dto';
import { UpdateEventoDto } from '../dto/update-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventoEntity } from '../entities/evento.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class EventoService {
  private readonly logger = new Logger('EventoService');
  relations = ['usuario', 'asistentes', 'compras', 'fotografos'];

  constructor(
    @InjectRepository(EventoEntity) private readonly eventoRepository: Repository<EventoEntity>,
    private readonly userService: UsersService,
  ) { }


  async create(createEventoDto: CreateEventoDto) {
    try {
      const { usuario, ...resto } = createEventoDto;
      const user = await this.userService.findOne(usuario);
      const evento = this.eventoRepository.create({ ...resto, usuario: user });
      return this.eventoRepository.save(evento);
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findAll() {
    try {
      const eventos = await this.eventoRepository.find({ relations: this.relations });
      return eventos;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string) {
    try {
      const evento = await this.eventoRepository.findOne({ relations: this.relations, where: { id } });
      if (!evento) throw new BadRequestException('Evento no encontrado.');
      return evento;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(id: string, updateEventoDto: UpdateEventoDto) {
    try {
      const { usuario, ...resto } = updateEventoDto;
      console.log(usuario);
      console.log(resto);
      const evento = await this.findOne(id);
      const eventoUp = await this.eventoRepository.createQueryBuilder('evento').update().set({ ...resto }).where('id = :id', { id }).execute();
      return await this.findOne(id);
    } catch (error) {
      this.handlerError(error);
    }
  }

  async remove(id: string) {
    try {
      const evento = await this.findOne(id);
      await this.eventoRepository.remove(evento);
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
