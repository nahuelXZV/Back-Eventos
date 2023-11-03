import { Module, Global } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entities/users.entity';
import { FotoUsuarioEntity } from './entities/foto-usuario.entity';
import { RolEntity } from './entities/rol.entity';
import { SuscripcionEntity } from './entities/suscripcion.entity';
import { UsuarioSuscripcionEntity } from './entities/usuario-suscripcion.entity';
import { FotoUsuarioService } from './services/foto-usuario.service';
import { RolService } from './services/rol.service';
import { SuscripcionService } from './services/suscripcion.service';
import { UsuarioSuscripcionService } from './services/usuario-suscripcion.service';
import { FotoUsuarioController } from './controllers/foto-usuario.controller';
import { RolController } from './controllers/rol.controller';
import { SuscripcionController } from './controllers/suscripcion.controller';
import { UsuarioSuscripcionController } from './controllers/usuario-suscripcion.controller';
import { FotografoEntity } from './entities/fotografo.entity';
import { ProvidersModule } from 'src/providers/providers.module';


@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([SuscripcionEntity, UsersEntity, FotoUsuarioEntity, FotoUsuarioEntity, RolEntity, UsuarioSuscripcionEntity, FotografoEntity]),
    ProvidersModule
  ],
  providers: [UsersService, FotoUsuarioService, RolService, SuscripcionService, UsuarioSuscripcionService],
  controllers: [UsersController, FotoUsuarioController, RolController, SuscripcionController, UsuarioSuscripcionController],
  exports: [TypeOrmModule, UsersService, FotoUsuarioService, RolService, SuscripcionService, UsuarioSuscripcionService]
})
export class UsersModule { }
