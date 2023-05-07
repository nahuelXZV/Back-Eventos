import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from '../dto/create-rol.dto';
import { UpdateRolDto } from '../dto/update-rol.dto';
import { RolEntity } from '../entities/rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService {
  private readonly logger = new Logger('RolService');

  constructor(
    @InjectRepository(RolEntity) private readonly userRepository: Repository<RolEntity>
  ) { }

  async create(createRolDto: CreateRolDto): Promise<RolEntity> {
    try {
      const rol: RolEntity = this.userRepository.create(createRolDto);
      return await this.userRepository.save(rol);
    } catch (error) {
      this.handlerError(error);
    }

  }

  async findAll(): Promise<RolEntity[]> {
    try {
      return await this.userRepository.find({ where: { isDeleted: false } });
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string): Promise<RolEntity> {
    try {
      const rol = await this.userRepository.createQueryBuilder('rol').where('rol.id = :id', { id }).andWhere('rol.isDeleted = false').getOne();
      if (!rol) throw new BadRequestException('Rol no encontrado.');
      return rol;
    } catch (error) {
      this.handlerError(error);
    }
  }


  public async findBy({ key, value }: { key: keyof CreateRolDto; value: any }) {
    try {
      const rol: RolEntity = await this.userRepository.createQueryBuilder('rol').where({ [key]: value }).andWhere(
        'rol.isDeleted = false').getOne();
      if (!rol) throw new NotFoundException('Usuario no encontrado.');
      return rol;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(id: string, updateRolDto: UpdateRolDto): Promise<UpdateRolDto> {
    try {
      const rol: RolEntity = await this.findOne(id);
      return this.userRepository.update(rol.id, updateRolDto).then(() => updateRolDto);
    } catch (error) {
      this.handlerError(error);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const rol: RolEntity = await this.findOne(id);
      await this.userRepository.update(rol.id, { isDeleted: true });
      return { message: 'Rol eliminado.' }
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
