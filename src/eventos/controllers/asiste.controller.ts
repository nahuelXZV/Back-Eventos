import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsisteService } from '../services/asiste.service';
import { CreateAsisteDto } from '../dto/create-asiste.dto';
import { UpdateAsisteDto } from '../dto/update-asiste.dto';

@Controller('asiste')
export class AsisteController {
  constructor(private readonly asisteService: AsisteService) { }

  @Post()
  create(@Body() createAsisteDto: CreateAsisteDto) {
    console.log(createAsisteDto);
    return this.asisteService.create(createAsisteDto);
  }

  @Get()
  findAll() {
    return this.asisteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asisteService.findOne(id);
  }

  @Get('by/:key/:value')
  findAsistenteBy(@Param('key') key: any, @Param('value') value: string) {
    return this.asisteService.findAsisteBy(key, value);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsisteDto: UpdateAsisteDto) {
    return this.asisteService.update(id, updateAsisteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asisteService.remove(id);
  }
}
