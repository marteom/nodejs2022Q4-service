import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ArtistModel } from './artist.model';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  async createArtistDto(@Body() dto: Omit<ArtistModel, 'id'>) {
    return this.artistService.createArtist(dto);
  }

  @Put(':id')
  async updateArtistInfo(
    @Param('id') id: string,
    @Body() dto: Omit<ArtistModel, 'id'>
  ) {
    return this.artistService.updateArtist(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistById(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
