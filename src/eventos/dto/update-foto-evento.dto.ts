import { PartialType } from '@nestjs/mapped-types';
import { CreateFotoEventoDto } from './create-foto-evento.dto';

export class UpdateFotoEventoDto extends PartialType(CreateFotoEventoDto) { }
