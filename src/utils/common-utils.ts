import { validate as uuidValidate } from 'uuid';

import { ArtistModel } from 'src/artist/artist.model';
import { AlbumModel } from 'src/album/album.model';
import { TrackModel } from 'src/track/track.model';

import { favoritesData } from 'src/favorites/data/favorites.data';

export const isIdValid = async (id: string): Promise<boolean> => {
  return uuidValidate(id);
};

export const getTracksArray = async (tracksData: Array<TrackModel>, trackList: Array<string>): Promise<Array<TrackModel>> => {
  const tracks: Array<TrackModel> = [];
  tracksData.forEach((element) => {
    if (trackList.includes(element.id)) {
      tracks.push(element);
    }
  });

  return tracks;
}

export const getAlbumsArray = async (albumsData: Array<AlbumModel>, albumList: Array<string>): Promise<Array<AlbumModel>> => {
  const albums: Array<AlbumModel> = [];
  albumsData.forEach((element) => {
    if (albumList.includes(element.id)) {
      albums.push(element);
    }
  });

  return albums;
}

export const getArtistsArray = async (artistsData: Array<ArtistModel>, artistList: Array<string>): Promise<Array<ArtistModel>> => {
  const artist: Array<ArtistModel> = [];
  artistsData.forEach((element) => {
    if (artistList.includes(element.id)) {
      artist.push(element);
    }
  });

  return artist;
}

export const delArtistFromFavorites = async (artistId: string): Promise<void> => {
  favoritesData.artists = favoritesData.artists.filter(id => id !== artistId);
}