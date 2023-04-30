import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioSuscripcionDto } from './create-usuario-suscripcion.dto';

export class UpdateUsuarioSuscripcionDto extends PartialType(CreateUsuarioSuscripcionDto) {}
