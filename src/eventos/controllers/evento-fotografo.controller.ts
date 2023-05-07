import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventoFotografoService } from '../services/evento-fotografo.service';
import { CreateEventoFotografoDto } from '../dto/create-evento-fotografo.dto';
import { UpdateEventoFotografoDto } from '../dto/update-evento-fotografo.dto';

@Controller('evento-fotografo')
export class EventoFotografoController {
  constructor(private readonly eventoFotografoService: EventoFotografoService) { }

  @Post()
  create(@Body() createEventoFotografoDto: CreateEventoFotografoDto) {
    return this.eventoFotografoService.create(createEventoFotografoDto);
  }

  @Get()
  findAll() {
    return this.eventoFotografoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoFotografoService.findOne(id);
  }

  @Get('by/:key/:value')
  findFotografoByEvento(@Param('key') key: any, @Param('value') value: string) {
    return this.eventoFotografoService.findFotografoByEvento(key, value);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoFotografoDto: UpdateEventoFotografoDto) {
    return this.eventoFotografoService.update(id, updateEventoFotografoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoFotografoService.remove(id);
  }
}
