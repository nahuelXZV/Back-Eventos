import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateTarjetaDto } from '../dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from '../dto/update-tarjeta.dto';
import { TarjetaEntity } from '../entities/tarjeta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class TarjetaService {
  private readonly logger = new Logger('TarjetaService');

  constructor(
    @InjectRepository(TarjetaEntity) private readonly tarjetaRepository: Repository<TarjetaEntity>,
    private readonly userService: UsersService
  ) { }

  public async create(createTarjetaDto: CreateTarjetaDto) {
    try {
      const { usuario, ...resto } = createTarjetaDto;
      const user: UsersEntity = await this.userService.findOne(usuario);
      const tarjeta: TarjetaEntity = this.tarjetaRepository.create({ ...resto, usuario: user });
      return await this.tarjetaRepository.save(tarjeta);
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async findAll() {
    try {
      return await this.tarjetaRepository.find({ where: { isDeleted: false } });
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async findOne(id: string) {
    try {
      return await this.tarjetaRepository.findOne({ where: { id, isDeleted: false }, relations: ['usuario'] });
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async update(id: string, updateTarjetaDto: UpdateTarjetaDto) {
    try {
      const { usuario, ...resto } = updateTarjetaDto;
      const user = await this.userService.findOne(usuario);
      const tarjeta = await this.findOne(id);
      this.tarjetaRepository.merge(tarjeta, { ...resto, usuario: user });
      return await this.tarjetaRepository.save(tarjeta);
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async remove(id: string) {
    try {
      const tarjeta = await this.findOne(id);
      await this.tarjetaRepository.remove(tarjeta);
      return { deleted: true }
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
