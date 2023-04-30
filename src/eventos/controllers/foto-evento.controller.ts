import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotoEventoService } from '../services/foto-evento.service';
import { CreateFotoEventoDto } from '../dto/create-foto-evento.dto';
import { UpdateFotoEventoDto } from '../dto/update-foto-evento.dto';

@Controller('foto-evento')
export class FotoEventoController {
  constructor(private readonly fotoEventoService: FotoEventoService) {}

  @Post()
  create(@Body() createFotoEventoDto: CreateFotoEventoDto) {
    return this.fotoEventoService.create(createFotoEventoDto);
  }

  @Get()
  findAll() {
    return this.fotoEventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotoEventoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoEventoDto: UpdateFotoEventoDto) {
    return this.fotoEventoService.update(+id, updateFotoEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotoEventoService.remove(+id);
  }
}
