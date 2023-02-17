import { Injectable, HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { favoritesData } from './data/favorites.data';
import { artistsData } from 'src/artist/data/artist.data';
import { albumsData } from 'src/album/data/album.data';
import { tracksData } from 'src/track/data/track.data';
import { isIdValid } from '../utils/common-utils';
import { getAlbumsArray, getArtistsArray, getTracksArray } from '../utils/common-utils';

@Injectable()
export class FavoritesService {
  async getAllFavorites() {
    return {
      artists: await getArtistsArray(artistsData, favoritesData.artists),
      albums: await getAlbumsArray(albumsData, favoritesData.albums),
      tracks: await getTracksArray(tracksData, favoritesData.tracks),
    }
  }

  async addTrackToFavorites(trackId: string) {
    if (trackId === undefined || !(trackId === null ? true : await isIdValid(trackId))) {
      throw new HttpException('required parameter "trackId" is missing or invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const trackIndex = tracksData.findIndex(element => element.id === trackId);
    if(trackIndex === -1) {
      throw new HttpException('Track does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    favoritesData.tracks.push(trackId);
    return `Track ${trackId} successfully add to favorites`;
  }

  async deleteTrackFavoritesById(trackId: string) {
    if (!trackId) {
      throw new HttpException('required parameter "trackId" is missing or invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    if (trackId === null) {
      throw new HttpException('trackId parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    if (!(await isIdValid(trackId))) {
      throw new HttpException('trackId parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const trackIndex = favoritesData.tracks.findIndex(element => element === trackId);
    if(trackIndex === -1) {
      throw new HttpException('Track does not exist in favorites', HttpStatus.NOT_FOUND);
    }

    return favoritesData.tracks.splice(trackIndex, 1);
  }

  async addAlbumToFavorites(albumId: string) {
    if (albumId === undefined || !(albumId === null ? true : await isIdValid(albumId))) {
      throw new HttpException('required parameter "albumId" is missing or invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const albumIndex = albumsData.findIndex(element => element.id === albumId);
    if(albumIndex === -1) {
      throw new HttpException('Album does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    favoritesData.albums.push(albumId);
    return `Album ${albumId} successfully add to favorites`;
  }

  async deleteAlbumFavoritesById(albumId: string) {
    if (!albumId) {
      throw new HttpException('required parameter "albumId" is missing or invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    if (albumId === null) {
      throw new HttpException('albumId parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    if (!(await isIdValid(albumId))) {
      throw new HttpException('albumId parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const albumIndex = favoritesData.albums.findIndex(element => element === albumId);
    if(albumIndex === -1) {
      throw new HttpException('Album does not exist in favorites', HttpStatus.NOT_FOUND);
    }

    return favoritesData.albums.splice(albumIndex, 1);
  }

  async addArtistToFavorites(artistId: string) {
    if (artistId === undefined || !(artistId === null ? true : await isIdValid(artistId))) {
      throw new HttpException('required parameter "artistId" is missing or invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const artistIndex = artistsData.findIndex(element => element.id === artistId);
    if(artistIndex === -1) {
      throw new HttpException('Artist does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    favoritesData.artists.push(artistId);
    return `Artist ${artistId} successfully add to favorites`;
  }

  async deleteArtistFavoritesById(artistId: string) {
    if (!artistId) {
      throw new HttpException('required parameter "artistId" is missing or invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    if (!(await isIdValid(artistId))) {
      throw new HttpException('artistId parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const artistsIndex = favoritesData.artists.findIndex(element => element === artistId);
    if(artistsIndex === -1) {
      throw new HttpException('Artist does not exist in favorites', HttpStatus.NOT_FOUND);
    }

    return favoritesData.artists.splice(artistsIndex, 1);
  }

}
