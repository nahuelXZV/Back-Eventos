import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompraService } from '../services/compra.service';
import { CreateCompraDto } from '../dto/create-compra.dto';
import { UpdateCompraDto } from '../dto/update-compra.dto';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) { }

  @Post()
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.compraService.create(createCompraDto);
  }

  @Get()
  findAll() {
    return this.compraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compraService.findOne(id);
  }

  @Get('by/:key/:value')
  findAsistenteBy(@Param('key') key: any, @Param('value') value: string, @Query('limit') limit: string) {
    return this.compraService.findCompraBy(key, value, +limit);
  }

  @Get('byEvento/:idEvento/:idUsuario')
  findCompraByEvento(@Param('idEvento') idEvento: string, @Param('idUsuario') idUsuario: string) {
    return this.compraService.findCompraByEvento(idEvento, idUsuario);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompraDto: UpdateCompraDto) {
    return this.compraService.update(id, updateCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compraService.remove(id);
  }
}
