import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, ParseUUIDPipe, UploadedFiles } from '@nestjs/common';
import { FotoUsuarioService } from '../services/foto-usuario.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/helpers/fileFilter';

@Controller('foto-usuario')
export class FotoUsuarioController {
  constructor(private readonly fotoUsuarioService: FotoUsuarioService) { }

  @UseInterceptors(FilesInterceptor('fotos', 10, { fileFilter: fileFilter, }))
  @Post()
  create(@UploadedFiles() fotos: Array<Express.Multer.File>, @Query('user_id', ParseUUIDPipe) user_id: string) {
    console.log(fotos);
    return this.fotoUsuarioService.create(fotos, user_id);
  }

  @UseInterceptors(FilesInterceptor('fotos', 10, { fileFilter: fileFilter, }))
  @Patch(':id')
  update(@UploadedFiles() fotos: Array<Express.Multer.File>, @Query('user_id', ParseUUIDPipe) user_id: string) {
    return this.fotoUsuarioService.update(fotos, user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('user_id', ParseUUIDPipe) user_id: string) {
    return this.fotoUsuarioService.remove(id, user_id);
  }
}
