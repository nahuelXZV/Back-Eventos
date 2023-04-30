import { PartialType } from '@nestjs/swagger';
import { CreateCompraFotoEventoDto } from './create-compra-foto-evento.dto';

export class UpdateCompraFotoEventoDto extends PartialType(CreateCompraFotoEventoDto) {}
