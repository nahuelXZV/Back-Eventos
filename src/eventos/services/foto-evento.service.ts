import { Injectable } from '@nestjs/common';
import { CreateFotoEventoDto } from '../dto/create-foto-evento.dto';
import { UpdateFotoEventoDto } from '../dto/update-foto-evento.dto';

@Injectable()
export class FotoEventoService {
  create(createFotoEventoDto: CreateFotoEventoDto) {
    return 'This action adds a new fotoEvento';
  }

  findAll() {
    return `This action returns all fotoEvento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fotoEvento`;
  }

  update(id: number, updateFotoEventoDto: UpdateFotoEventoDto) {
    return `This action updates a #${id} fotoEvento`;
  }

  remove(id: number) {
    return `This action removes a #${id} fotoEvento`;
  }
}
