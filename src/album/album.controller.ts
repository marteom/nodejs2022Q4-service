import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AlbumModel } from './album.model';

@Controller('album')
export class AlbumController {
  @Get()
  async getAllAlbums() {
    return [];
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    return {};
  }

  @Post()
  async CreateAlbumDto(@Body() dto: Omit<AlbumModel, 'id'>) {
    return {};
  }

  @Put(':id')
  async updateAlbumInfo(
    @Param('id') id: string,
    @Body() dto: Omit<AlbumModel, 'id'>,
  ) {
    return {};
  }

  @Delete(':id')
  async deleteAlbumById(@Param('id') id: string) {
    return {};
  }
}
