import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrecioEntity } from '../entities/precio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrecioDto } from '../dto/create-precio.dto';
import { UpdatePrecioDto } from '../dto/update-precio.dto';

@Injectable()
export class PrecioService {

  private readonly logger = new Logger('PrecioService');

  constructor(
    @InjectRepository(PrecioEntity) private readonly precioRepository: Repository<PrecioEntity>,
  ) { }

  async create(createPrecioDto: CreatePrecioDto) {
    try {
      const precio = this.precioRepository.create(createPrecioDto);
      return await this.precioRepository.save(precio);
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findAll() {
    try {
      return await this.precioRepository.find();
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.precioRepository.findOne({ where: { id } });
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(id: string, updatePrecioDto: UpdatePrecioDto) {
    try {
      const precio = await this.findOne(id);
      return await this.precioRepository.update(id, updatePrecioDto);
    } catch (error) {
      this.handlerError(error);
    }
  }

  async remove(id: string) {
    try {
      const precio = await this.findOne(id);
      await this.precioRepository.delete(id);
      return { deleted: true }
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
