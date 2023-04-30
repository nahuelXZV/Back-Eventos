import { PartialType } from '@nestjs/swagger';
import { CreateAsisteDto } from './create-asiste.dto';

export class UpdateAsisteDto extends PartialType(CreateAsisteDto) {}
