import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TrackModel } from './track.model';

@Controller('track')
export class TrackController {
  @Get()
  async getAllTracks() {
    return [];
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    return {};
  }

  @Post()
  async CreateTrackDto(@Body() dto: Omit<TrackModel, 'id'>) {
    return {};
  }

  @Put(':id')
  async updateTrackInfo(
    @Param('id') id: string,
    @Body() dto: Omit<TrackModel, 'id'>,
  ) {
    return {};
  }

  @Delete(':id')
  async deleteTrackById(@Param('id') id: string) {
    return {};
  }
}
