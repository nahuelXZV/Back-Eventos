import { PartialType } from '@nestjs/mapped-types';
import { CreateCompraFotoEventoDto } from './create-compra-foto-evento.dto';

export class UpdateCompraFotoEventoDto extends PartialType(CreateCompraFotoEventoDto) {}
