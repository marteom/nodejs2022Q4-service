import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ArtistModel } from './artist.model';
import { artistsData } from './data/artist.data';
import { Response } from 'express';
import { isIdValid } from '../utils/common-utils';
import { getArtist } from './utils/helper';

@Controller('artist')
export class ArtistController {
  @Get()
  async getAllArtists() {
    return artistsData;
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const artist: ArtistModel = artistsData.find(
      (element: ArtistModel) => element.id === id,
    );

    if (artist) {
      return response.status(HttpStatus.OK).send(artist);
    }

    return response.status(HttpStatus.NOT_FOUND).send('Artist not found');
  }

  @Post()
  async CreateArtistDto(@Body() dto: Omit<ArtistModel, 'id'>, @Res() response: Response,) {
    if (!dto.name) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "name" is missing');
    }

    if (dto.grammy === undefined || typeof(dto.grammy) !== "boolean") {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "grammy" is missing or have incorrect type');
    }

    const newArtist = await getArtist(dto.name, dto.grammy);
    artistsData.push(newArtist);
    return response.status(HttpStatus.CREATED).send(newArtist);
  }

  @Put(':id')
  async updateArtistInfo(
    @Param('id') id: string,
    @Body() dto: Omit<ArtistModel, 'id'>,
    @Res() response: Response,
  ) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    if (!dto.name) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "name" is missing');
    }

    if (dto.grammy === undefined || typeof(dto.grammy) !== "boolean") {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "grammy" is missing or have incorrect type');
    }

    const putedArtistIndex = artistsData.findIndex(
      (element: ArtistModel) => element.id === id,
    );

    if (putedArtistIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('Artist not found');
    }

    artistsData[putedArtistIndex].name = dto.name;
    artistsData[putedArtistIndex].grammy = dto.grammy;

    return response.status(HttpStatus.OK).send(artistsData[putedArtistIndex]);
  }

  @Delete(':id')
  async deleteArtistById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const deletedArtistIndex = artistsData.findIndex(
      (element: ArtistModel) => element.id === id,
    );

    if (deletedArtistIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('Artist not found');
    }

    artistsData.splice(deletedArtistIndex, 1);

    return response
      .status(HttpStatus.NO_CONTENT)
      .send('Artist successfully deleted');
  }
}
