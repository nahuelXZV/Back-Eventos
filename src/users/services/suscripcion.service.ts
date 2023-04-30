import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSuscripcionDto } from '../dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from '../dto/update-suscripcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SuscripcionEntity } from '../entities/suscripcion.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class SuscripcionService {
  private readonly logger = new Logger('SuscripcionService');

  constructor(
    @InjectRepository(SuscripcionEntity) private readonly suscripcionRepository: Repository<SuscripcionEntity>,
  ) { }

  public async create(createSuscripcionDto: CreateSuscripcionDto): Promise<SuscripcionEntity> {
    try {
      const suscripcion = this.suscripcionRepository.create(createSuscripcionDto);
      return await this.suscripcionRepository.save(suscripcion);
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async findAll(paginationDto: PaginationDto): Promise<SuscripcionEntity[]> {
    try {
      const { limit, offset } = paginationDto;
      if (limit && offset) return await this.suscripcionRepository.find({ where: { isDeleted: false }, take: limit, skip: offset });
      if (limit) return await this.suscripcionRepository.find({ where: { isDeleted: false }, take: limit });
      return await this.suscripcionRepository.find({ where: { isDeleted: false } });
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async findOne(id: string): Promise<SuscripcionEntity> {
    try {
      const suscripcion: SuscripcionEntity = await this.suscripcionRepository.findOne({ where: { id, isDeleted: false } });
      if (!suscripcion) throw new BadRequestException('Suscripcion no encontrada.');
      return suscripcion;
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async update(id: string, updateSuscripcionDto: UpdateSuscripcionDto): Promise<SuscripcionEntity> {
    try {
      const suscripcion: SuscripcionEntity = await this.suscripcionRepository.findOne({ where: { id, isDeleted: false } });
      if (!suscripcion) throw new BadRequestException('Suscripcion no encontrada.');
      const suscripcionUpdated = Object.assign(suscripcion, updateSuscripcionDto);
      return await this.suscripcionRepository.save(suscripcionUpdated);
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async remove(id: string) {
    try {
      const suscripcion: SuscripcionEntity = await this.findOne(id);
      if (!suscripcion) throw new BadRequestException('Suscripcion no encontrada.');
      suscripcion.isDeleted = true;
      await this.suscripcionRepository.save(suscripcion);
      return { deleted: true };
    } catch (error) {
      this.handlerError(error);
    }
  }

  handlerError(error: any) {
    this.logger.error(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(error.message);
  }
}
