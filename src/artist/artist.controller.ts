import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ArtistModel } from './artist.model';

@Controller('artist')
export class ArtistController {
  @Get()
  async getAllArtists() {
    return [];
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return {};
  }

  @Post()
  async CreateArtistDto(@Body() dto: Omit<ArtistModel, 'id'>) {
    return {};
  }

  @Put(':id')
  async updateArtistInfo(
    @Param('id') id: string,
    @Body() dto: Omit<ArtistModel, 'id'>,
  ) {
    return {};
  }

  @Delete(':id')
  async deleteArtistById(@Param('id') id: string) {
    return {};
  }
}
