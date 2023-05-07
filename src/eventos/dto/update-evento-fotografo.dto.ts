import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoFotografoDto } from './create-evento-fotografo.dto';

export class UpdateEventoFotografoDto extends PartialType(CreateEventoFotografoDto) {}
