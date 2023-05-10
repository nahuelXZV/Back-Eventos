import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FotoEventoService } from '../services/foto-evento.service';
import { CreateFotoEventoDto } from '../dto/create-foto-evento.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/helpers/fileFilter';

@Controller('foto-evento')
export class FotoEventoController {
  constructor(private readonly fotoEventoService: FotoEventoService) { }

  @UseInterceptors(FilesInterceptor('fotos', 10, { fileFilter: fileFilter, }))
  @Post()
  create(@UploadedFiles() fotos: Array<Express.Multer.File>, @Body() createFotoEvento: CreateFotoEventoDto) {
    return this.fotoEventoService.create(fotos, createFotoEvento);
  }

  @UseInterceptors(FilesInterceptor('fotos', 10, { fileFilter: fileFilter, }))
  @Patch(':id')
  update(@UploadedFiles() fotos: Array<Express.Multer.File>) {
    // return this.fotoEventoService.update(fotos, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.fotoEventoService.remove(id);
  }
  @Get('test')
  test() {
    return this.fotoEventoService.test();
  }

  @Get(':evento')
  find(@Param('evento') evento: string) {
    return this.fotoEventoService.find(evento);
  }


}
