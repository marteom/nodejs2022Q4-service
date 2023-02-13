import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TrackModel } from './track.model';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  async CreateTrackDto(
    @Body() dto: Omit<TrackModel, 'id'>,
  ) {
    return this.trackService.createTrack(dto);
  }

  @Put(':id')
  async updateTrackInfo(
    @Param('id') id: string,
    @Body() dto: Omit<TrackModel, 'id'>,
  ) {
    return this.trackService.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackById(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}