import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioSuscripcionService } from '../services/usuario-suscripcion.service';
import { CreateUsuarioSuscripcionDto } from '../dto/create-usuario-suscripcion.dto';
import { UpdateUsuarioSuscripcionDto } from '../dto';

@Controller('usuario-suscripcion')
export class UsuarioSuscripcionController {
  constructor(private readonly usuarioSuscripcionService: UsuarioSuscripcionService) { }

  @Post()
  create(@Body() createUsuarioSuscripcionDto: CreateUsuarioSuscripcionDto) {
    return this.usuarioSuscripcionService.create(createUsuarioSuscripcionDto);
  }

  @Get()
  findAll() {
    return this.usuarioSuscripcionService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioSuscripcionDto: UpdateUsuarioSuscripcionDto) {
    return this.usuarioSuscripcionService.update(id, updateUsuarioSuscripcionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioSuscripcionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioSuscripcionService.remove(id);
  }
}
