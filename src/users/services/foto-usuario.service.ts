import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoUsuarioEntity } from '../entities/foto-usuario.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { S3Service } from 'src/providers/s3/s3.service';

@Injectable()
export class FotoUsuarioService {
  private readonly logger = new Logger('FotoUsuarioService');

  constructor(
    @InjectRepository(FotoUsuarioEntity) private readonly fotoUsuarioRepository: Repository<FotoUsuarioEntity>,
    private readonly userService: UsersService,
    private readonly s3Service: S3Service
  ) { }


  async create(fotos: Array<Express.Multer.File>, user_id: string) {
    try {
      const user = await this.userService.findOne(user_id);
      fotos.forEach(async (foto) => {
        const fotoUsuario = new FotoUsuarioEntity();
        const name = 'usuarios/' + foto.originalname.split('.') + "| " + user.id;
        const compress = await this.s3Service.uploadFile(foto, 'compress', name);
        const normal = await this.s3Service.uploadFile(foto, 'normal', name);
        fotoUsuario.dir_foto_normal = normal.Location;
        fotoUsuario.dir_foto_compresa = compress.Location;
        fotoUsuario.nombre = foto.originalname;
        fotoUsuario.usuario = user;
        fotoUsuario.extension = foto.mimetype;
        await this.fotoUsuarioRepository.save(fotoUsuario);
      });
    } catch (error) {
      this.handlerError(error);
    }
  }

  update(fotos: Array<Express.Multer.File>, user_id: string) {
  }

  remove(id: string, user_id: string) {
  }

  handlerError(error: any) {
    this.logger.error(error.message);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(error.message);
  }
}
