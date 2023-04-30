import { PartialType } from '@nestjs/swagger';
import { CreateEventoFotografoDto } from './create-evento-fotografo.dto';

export class UpdateEventoFotografoDto extends PartialType(CreateEventoFotografoDto) {}
