import { PartialType } from '@nestjs/swagger';
import { CreateFotoEventoDto } from './create-foto-evento.dto';

export class UpdateFotoEventoDto extends PartialType(CreateFotoEventoDto) {}
