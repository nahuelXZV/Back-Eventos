import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from 'src/providers/providers.module';
import { AsisteEntity } from './entities/asiste.entity';
import { CompraEntity } from './entities/compra.entity';
import { CompraFotoEventoEntity } from './entities/compra-foto-evento.entity';
import { EventoFotografoEntity } from './entities/evento-fotografo.entity';
import { EventoEntity } from './entities/evento.entity';
import { FotoEventoEntity } from './entities/foto-evento.entity';
import { PrecioEntity } from './entities/precio.entity';
import { AsisteService } from './services/asiste.service';
import { CompraFotoEventoService } from './services/compra-foto-evento.service';
import { CompraService } from './services/compra.service';
import { EventoFotografoService } from './services/evento-fotografo.service';
import { EventoService } from './services/evento.service';
import { FotoEventoService } from './services/foto-evento.service';
import { AsisteController } from './controllers/asiste.controller';
import { CompraFotoEventoController } from './controllers/compra-foto-evento.controller';
import { CompraController } from './controllers/compra.controller';
import { EventoFotografoController } from './controllers/evento-fotografo.controller';
import { EventoController } from './controllers/evento.controller';
import { FotoEventoController } from './controllers/foto-evento.controller';
import { PrecioService } from './services/precio.service';
import { PrecioController } from './controllers/precio.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AsisteEntity, CompraEntity, CompraFotoEventoEntity, EventoFotografoEntity, EventoEntity, FotoEventoEntity, PrecioEntity]),
    ProvidersModule
  ],
  controllers: [AsisteController, CompraFotoEventoController, CompraController, EventoFotografoController, EventoController, FotoEventoController, PrecioController],
  providers: [AsisteService, CompraFotoEventoService, CompraService, EventoFotografoService, EventoService, FotoEventoService, PrecioService],
  exports: [AsisteService, CompraFotoEventoService, CompraService, EventoFotografoService, EventoService, FotoEventoService]
})
export class EventosModule { }
