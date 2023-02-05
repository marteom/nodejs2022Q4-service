import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('favs')
export class FavoritesController {
  @Get()
  async getAllFavorites() {
    return {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  @Post('/track/:id')
  async addTrackToFavoritesDto(@Param('id') id: string) {
    return {};
  }

  @Delete('/track/:id')
  async deleteTrackFavoritesById(@Param('id') id: string) {
    return {};
  }

  @Post('/album/:id')
  async addAlbumToFavoritesDto(@Param('id') id: string) {
    return {};
  }

  @Delete('/album/:id')
  async deleteAlbumFavoritesById(@Param('id') id: string) {
    return {};
  }

  @Post('/artist/:id')
  async addArtistToFavoritesDto(@Param('id') id: string) {
    return {};
  }

  @Delete('/artist/:id')
  async deleteArtistFavoritesById(@Param('id') id: string) {
    return {};
  }
}
