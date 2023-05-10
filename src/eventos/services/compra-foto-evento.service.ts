import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCompraFotoEventoDto } from '../dto/create-compra-foto-evento.dto';
import { UpdateCompraFotoEventoDto } from '../dto/update-compra-foto-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompraFotoEventoEntity } from '../entities/compra-foto-evento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompraFotoEventoService {

  private readonly logger = new Logger('CompraFotoEventoService');

  constructor(
    @InjectRepository(CompraFotoEventoEntity) private readonly compraFotoRepository: Repository<CompraFotoEventoEntity>,
  ) { }

  create(createCompraFotoEventoDto: CreateCompraFotoEventoDto) {
    return 'This action adds a new compraFotoEvento';
  }

  findAll() {
    return `This action returns all compraFotoEvento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compraFotoEvento`;
  }

  async findBy(key: any, value: string) {
    try {
      const fotos = await this.compraFotoRepository.createQueryBuilder(
        'compraFotoEvento').leftJoinAndSelect('compraFotoEvento.fotoEvento', 'fotoEvento').leftJoinAndSelect('fotoEvento.fotografo', 'fotografo').leftJoinAndSelect('fotoEvento.evento', 'evento').leftJoinAndSelect('compraFotoEvento.compra', 'compra').where({ [key]: value }).getMany();
      return fotos;
    } catch (error) {
      this.handlerError(error);
    }
  }


  async findVentaBy(fotografo: string, evento?: string) {
    try {

    } catch (error) {
      this.handlerError(error);
    }

  }


  update(id: number, updateCompraFotoEventoDto: UpdateCompraFotoEventoDto) {
    return `This action updates a #${id} compraFotoEvento`;
  }

  remove(id: number) {
    return `This action removes a #${id} compraFotoEvento`;
  }

  handlerError(error: any) {
    this.logger.error(error.message);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(error.message);
  }
}
