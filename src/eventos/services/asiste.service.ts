import { Injectable } from '@nestjs/common';
import { CreateAsisteDto } from '../dto/create-asiste.dto';
import { UpdateAsisteDto } from '../dto/update-asiste.dto';

@Injectable()
export class AsisteService {
  create(createAsisteDto: CreateAsisteDto) {
    return 'This action adds a new asiste';
  }

  findAll() {
    return `This action returns all asiste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asiste`;
  }

  update(id: number, updateAsisteDto: UpdateAsisteDto) {
    return `This action updates a #${id} asiste`;
  }

  remove(id: number) {
    return `This action removes a #${id} asiste`;
  }
}
