import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUsuarioSuscripcionDto } from '../dto/create-usuario-suscripcion.dto';
import { UsersService } from './users.service';
import { SuscripcionService } from './suscripcion.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioSuscripcionEntity } from '../entities/usuario-suscripcion.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UpdateUsuarioSuscripcionDto } from '../dto';

@Injectable()
export class UsuarioSuscripcionService {
  private readonly logger = new Logger('UsuarioSuscripcionService');

  constructor(
    @InjectRepository(UsuarioSuscripcionEntity) private readonly usuarioSuscripcionRepository: Repository<UsuarioSuscripcionEntity>,
    private readonly userService: UsersService,
    private readonly suscripcionService: SuscripcionService
  ) { }

  public async create(createUsuarioSuscripcionDto: CreateUsuarioSuscripcionDto) {
    try {
      const { usuario, suscripcion, ...rest } = createUsuarioSuscripcionDto;
      const user: UsersEntity = await this.userService.findOne(usuario);
      const suscripcionEntity = await this.suscripcionService.findOne(suscripcion);
      const usuarioSuscripcion = this.usuarioSuscripcionRepository.create({ usuario: user, suscripcion: suscripcionEntity, ...rest });
      return await this.usuarioSuscripcionRepository.save(usuarioSuscripcion);
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async findAll() {
    try {
      return await this.usuarioSuscripcionRepository.find({ where: { isDeleted: false }, relations: ['usuario', 'suscripcion'] });
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async findOne(id: string) {
    try {
      const usuarioSuscripcion: UsuarioSuscripcionEntity = await this.usuarioSuscripcionRepository.findOne({ where: { id, isDeleted: false }, relations: ['usuario', 'suscripcion'] });
      if (!usuarioSuscripcion) throw new BadRequestException('UsuarioSuscripcion no encontrada.');
      return usuarioSuscripcion;
    } catch (error) {
      this.handlerError(error);
    }
  }

  public async update(id: string, updateUsuarioSuscripcionDto: UpdateUsuarioSuscripcionDto) {
    try {
      const { usuario, suscripcion, ...rest } = updateUsuarioSuscripcionDto;
      const userSuscripcion = await this.findOne(id);
      const userSuscripcionUpdated = this.usuarioSuscripcionRepository.merge(userSuscripcion, { ...rest });
      return await this.usuarioSuscripcionRepository.save(userSuscripcionUpdated);
    } catch (error) {
      this.handlerError(error);
    }

  }

  public async remove(id: string) {
    try {
      const usuarioSuscripcion: UsuarioSuscripcionEntity = await this.findOne(id);
      if (!usuarioSuscripcion) throw new BadRequestException('UsuarioSuscripcion no encontrada.');
      usuarioSuscripcion.isDeleted = true;
      this.usuarioSuscripcionRepository.save(usuarioSuscripcion);
      return { message: 'UsuarioSuscripcion eliminada.' }
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
