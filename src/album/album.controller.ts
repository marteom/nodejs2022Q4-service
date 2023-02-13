import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  HttpCode,
  Param,
  Post,
  Put
} from '@nestjs/common';

import { AlbumModel } from './album.model';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  async createAlbumDto(@Body() dto: Omit<AlbumModel, 'id'>) {
    return this.albumService.createAlbum(dto);
  }

  @Put(':id')
  async updateAlbumInfo(
    @Param('id') id: string,
    @Body() dto: Omit<AlbumModel, 'id'>,
  ) {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumById(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
