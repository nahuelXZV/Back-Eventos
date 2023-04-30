import { Injectable } from '@nestjs/common';
import { CreateEventoFotografoDto } from '../dto/create-evento-fotografo.dto';
import { UpdateEventoFotografoDto } from '../dto/update-evento-fotografo.dto';

@Injectable()
export class EventoFotografoService {
  create(createEventoFotografoDto: CreateEventoFotografoDto) {
    return 'This action adds a new eventoFotografo';
  }

  findAll() {
    return `This action returns all eventoFotografo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventoFotografo`;
  }

  update(id: number, updateEventoFotografoDto: UpdateEventoFotografoDto) {
    return `This action updates a #${id} eventoFotografo`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventoFotografo`;
  }
}
