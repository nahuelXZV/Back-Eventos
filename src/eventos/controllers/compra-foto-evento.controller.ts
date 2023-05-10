import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompraFotoEventoService } from '../services/compra-foto-evento.service';
import { CreateCompraFotoEventoDto } from '../dto/create-compra-foto-evento.dto';
import { UpdateCompraFotoEventoDto } from '../dto/update-compra-foto-evento.dto';

@Controller('compra-foto-evento')
export class CompraFotoEventoController {
  constructor(private readonly compraFotoEventoService: CompraFotoEventoService) { }

  @Post()
  create(@Body() createCompraFotoEventoDto: CreateCompraFotoEventoDto) {
    return this.compraFotoEventoService.create(createCompraFotoEventoDto);
  }

  @Get()
  findAll() {
    return this.compraFotoEventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compraFotoEventoService.findOne(+id);
  }
  // get by
  @Get('by/:key/:value')
  findBy(@Param('key') key: string, @Param('value') value: string) {
    return this.compraFotoEventoService.findBy(key, value);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompraFotoEventoDto: UpdateCompraFotoEventoDto) {
    return this.compraFotoEventoService.update(+id, updateCompraFotoEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compraFotoEventoService.remove(+id);
  }
}
