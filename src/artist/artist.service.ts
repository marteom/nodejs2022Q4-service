import { Injectable, HttpException } from '@nestjs/common';
import { artistsData } from './data/artist.data';
import { ArtistModel } from './artist.model';
import { isIdValid, delArtistFromFavorites, nulledArtistForAlbum, nulledArtistForTrack } from '../utils/common-utils';
import { HttpStatus } from '@nestjs/common/enums';
import { getArtist } from './utils/helper';
import { albumsData } from 'src/album/data/album.data';
import { tracksData } from 'src/track/data/track.data';

@Injectable()
export class ArtistService {
  async getAllArtists() {
    return artistsData;
  }

  async getArtistById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException('id parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const artist: ArtistModel = artistsData.find(
      (element: ArtistModel) => element.id === id,
    );

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async createArtist(dto: Omit<ArtistModel, 'id'>) {
    if (!dto.name) {
      throw new HttpException('required parameter "name" is missing', HttpStatus.BAD_REQUEST);
    }

    if (dto.grammy === undefined || typeof(dto.grammy) !== "boolean") {
      throw new HttpException('required parameter "grammy" is missing or have incorrect type', HttpStatus.BAD_REQUEST);
    }

    const newArtist = await getArtist(dto.name, dto.grammy);
    artistsData.push(newArtist);
    return newArtist;
  }

  async updateArtist(
    id: string,
    dto: Omit<ArtistModel, 'id'>
  ) {
    if (!(await isIdValid(id))) {
      throw new HttpException('id parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    if (!dto.name) {
      throw new HttpException('required parameter "name" is missing', HttpStatus.BAD_REQUEST);
    }

    if (dto.grammy === undefined || typeof(dto.grammy) !== "boolean") {
      throw new HttpException('required parameter "grammy" is missing', HttpStatus.BAD_REQUEST);
    }

    const putedArtistIndex = artistsData.findIndex(
      (element: ArtistModel) => element.id === id,
    );

    if (putedArtistIndex === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    artistsData[putedArtistIndex].name = dto.name;
    artistsData[putedArtistIndex].grammy = dto.grammy;

    return artistsData[putedArtistIndex];
  }

  async deleteArtist(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException('id parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const deletedArtistIndex = artistsData.findIndex(
      (element: ArtistModel) => element.id === id,
    );

    if (deletedArtistIndex === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await delArtistFromFavorites(id);
    await nulledArtistForAlbum(albumsData, id);
    await nulledArtistForTrack(tracksData, id);

    return artistsData.splice(deletedArtistIndex, 1);
  }

}
