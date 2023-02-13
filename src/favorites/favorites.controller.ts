import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { favoritesData } from './data/favorites.data';
import { tracksData } from '../track/data/track.data';
import { albumsData } from '../album/data/album.data';
import { artistsData } from '../artist/data/artist.data';
import { Response } from 'express';
import { isIdValid } from '../utils/common-utils';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  async addTrackToFavoritesDto(@Param('id') trackId: string) {
      return this.favoritesService.addTrackToFavorites(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFavoritesById(@Param('id') trackId: string) {
    return this.favoritesService.deleteTrackFavoritesById(trackId);
  }

  @Post('/album/:id')
  async addAlbumToFavoritesDto(@Param('id') albumId: string) {
    return this.favoritesService.addAlbumToFavorites(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFavoritesById(@Param('id') albumId: string) {
    return this.favoritesService.deleteAlbumFavoritesById(albumId);
  }

  @Post('/artist/:id')
  async addArtistToFavoritesDto(@Param('id') artistId: string) {
    return this.favoritesService.addArtistToFavorites(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFavoritesById(@Param('id') artistId: string) {
    return this.favoritesService.deleteArtistFavoritesById(artistId);
  }
}
