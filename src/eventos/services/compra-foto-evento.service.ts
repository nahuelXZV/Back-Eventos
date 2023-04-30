import { Injectable } from '@nestjs/common';
import { CreateCompraFotoEventoDto } from '../dto/create-compra-foto-evento.dto';
import { UpdateCompraFotoEventoDto } from '../dto/update-compra-foto-evento.dto';

@Injectable()
export class CompraFotoEventoService {
  create(createCompraFotoEventoDto: CreateCompraFotoEventoDto) {
    return 'This action adds a new compraFotoEvento';
  }

  findAll() {
    return `This action returns all compraFotoEvento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compraFotoEvento`;
  }

  update(id: number, updateCompraFotoEventoDto: UpdateCompraFotoEventoDto) {
    return `This action updates a #${id} compraFotoEvento`;
  }

  remove(id: number) {
    return `This action removes a #${id} compraFotoEvento`;
  }
}
