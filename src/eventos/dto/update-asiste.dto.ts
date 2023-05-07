import { PartialType } from '@nestjs/mapped-types';
import { CreateAsisteDto } from './create-asiste.dto';

export class UpdateAsisteDto extends PartialType(CreateAsisteDto) {}
