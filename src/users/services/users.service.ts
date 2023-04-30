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
    relations = ['roles', 'fotografo', 'fotos'];
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
            console.log(user);
            const userDB = await this.findOne(user.id);
            console.log(userDB);
            if (fotografo) await this.fotografoRepository.save({ fotografo, usuario: userDB });
            if (!role) return userDB;
            role.forEach(async (rol: string) => {
                const rolDB = await this.rolService.findOne(rol);
                if (rolDB.nombre === 'organizador') userDB.isOrganizador = true;
                userDB.roles.push(rolDB);
            });
            await this.userRepository.save(userDB);
            return userDB;
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
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').addSelect('user.password').where({ [key]: value }).andWhere(
                'user.isDeleted = false').getOne();
            if (!user) throw new NotFoundException('Usuario no encontrado.');
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findOneAuth(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).andWhere('user.isDeleted = false').getOne();
            if (!user) throw new UnauthorizedException('Usuario asociado al token no encontrado.');
            return user;
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
