import { Repository } from 'typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserCreateDto, UserUpdateDTO } from '../dto/';
import { UsersEntity } from '../entities/users.entity';
import { RolService } from './rol.service';
import { FotografoEntity } from '../entities/fotografo.entity';

@Injectable()
export class UsersService {
    private readonly logger = new Logger('UsersService');
    relations = ['roles', 'fotos'];
    where = { isDeleted: false, roles: { isDeleted: false }, fotografo: { isDeleted: false }, fotos: { isDeleted: false } };

    constructor(
        @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
        @InjectRepository(FotografoEntity) private readonly fotografoRepository: Repository<FotografoEntity>,
        private readonly rolService: RolService,
    ) { }

    public async findAll(): Promise<UsersEntity[]> {
        try {
            const users: UsersEntity[] = await this.userRepository.find({ where: { isDeleted: false, roles: { isDeleted: false } }, relations: this.relations });
            if (!users) throw new NotFoundException('No hay usuarios registrados.');
            return users;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async createUser(body: UserCreateDto): Promise<UsersEntity> {
        try {
            const { role, fotografo, ...rest } = body;
            rest.password = await bcrypt.hash(body.password, +process.env.HASH_SALT); // Hash password
            const user: UsersEntity = await this.userRepository.save({ ...rest, isOrganizador: false });
            const usuario: UsersEntity = await this.findOne(user.id);
            if (fotografo) {
                const fotografoEntity = await this.fotografoRepository.save({ ...fotografo, usuario });
                usuario.fotografo = fotografoEntity;
                console.log(usuario);
            }
            if (!role) return usuario;
            role.forEach(async (rol: string) => {
                const rolDB = await this.rolService.findOne(rol);
                if (rolDB.nombre === 'organizador') usuario.isOrganizador = true;
                usuario.roles.push(rolDB);
            });
            await this.userRepository.save(usuario);
            return usuario;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findOne(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity = await this.userRepository.findOne({ where: { id, isDeleted: false }, relations: this.relations });
            if (!user) throw new NotFoundException('Usuario no encontrado.');
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async update(id: string, body: UserUpdateDTO): Promise<UserUpdateDTO> {
        try {
            const { role, fotografo, ...rest } = body;
            if (rest.password) rest.password = await bcrypt.hash(rest.password, +process.env.HASH_SALT); // Hash password (if exists in body)
            await this.userRepository.update(id, rest);
            const user: UsersEntity = await this.findOne(id);
            if (fotografo) {
                const fotografoDB = await this.fotografoRepository.findOne({ where: { usuario: user } });
                if (!fotografoDB) await this.fotografoRepository.save({ fotografo, usuario: user });
                else await this.fotografoRepository.update(fotografoDB.id, { ...fotografo, usuario: user });
            }
            if (!role) return user;
            user.roles = [];
            await this.userRepository.save(user);
            role.forEach(async (rol: string) => {
                const rolDB = await this.rolService.findOne(rol);
                user.roles.push(rolDB);
            });
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async delete(id: string): Promise<{}> {
        try {
            const user = await this.findOne(id);
            user.isDeleted = true;
            await this.userRepository.save(user);
            return { message: 'Usuario eliminado.' };
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findBy({ key, value }: { key: keyof UserCreateDto; value: any }) {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').addSelect('user.password').leftJoinAndSelect('user.roles', 'roles').where({ [key]: value }).andWhere(
                'user.isDeleted = false').getOne();
            if (!user) throw new NotFoundException('Usuario no encontrado.');
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findOneAuth(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.roles', 'roles')
                .where('user.id = :id', { id }).andWhere('user.isDeleted = false').getOne();
            if (!user) throw new UnauthorizedException('Usuario asociado al token no encontrado.');
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findFotografos(id: string) {
        try {
            console.log(id);
            const fotografo: FotografoEntity = await this.fotografoRepository.findOne({ where: { id }, relations: ['usuario'] });
            if (!fotografo) throw new NotFoundException('No hay fotografos registrados.');
            return fotografo;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findFotografoBy(key: any, value: string) {
        try {
            const fotografo: FotografoEntity = await this.fotografoRepository.findOne({ where: { [key]: value }, relations: ['usuario'] });
            if (!fotografo) throw new NotFoundException('Fotografo no encontrado.');
            return fotografo;
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
