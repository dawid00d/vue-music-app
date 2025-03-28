export interface ITunesImage {
    label: string;
    attributes: {
        height: string;
    }
}

export interface ITunesPrice {
    label: string;
    attributes: {
        amount: string;
        currency: string;
    }
}

export interface ITunesLink {
    attributes: {
        rel: string;
        type: string;
        href: string;
    }
    'im:duration'?: {
        label: string;
    }
}

export interface ITunesCategory {
    attributes: {
        'im:id': string;
        term: string;
        scheme: string;
        label: string;
    }
}

export interface ITunesDate {
    label: string;
    attributes: {
        label: string;
    }
}

export interface ITunesLabel {
    label: string;
}

export interface ITunesId {
    label: string;
    attributes: {
        'im:id': string;
    }
}

export interface ITunesContentType {
    attributes: {
        term: string;
        label: string;
    }
}

export interface Movie {
    'im:name': ITunesLabel;
    rights: ITunesLabel;
    'im:image': ITunesImage[];
    summary: ITunesLabel;
    'im:rentalPrice': ITunesPrice;
    'im:price': ITunesPrice;
    'im:contentType': ITunesContentType;
    title: ITunesLabel;
    link: ITunesLink[];
    id: ITunesId;
    'im:artist': ITunesLabel;
    category: ITunesCategory;
    'im:releaseDate': ITunesDate;
}

export interface Album {
    id: string;
    title: string;
    artist: string;
    image: string;
    price: number;
    currency: string;
    releaseDate: string;
    genre: string;
    copyright: string;
    songs?: Song[];
}

export interface FeedResponse<T> {
    feed: {
        entry: T[];
        updated: ITunesLabel;
        rights: ITunesLabel;
        title: ITunesLabel;
        icon: ITunesLabel;
        link: ITunesLink[];
        id: ITunesLabel;
    }
}

export interface Song {
  id: string
  title: string
  artist: string
  albumId: string
  albumTitle: string
  duration: string
  previewUrl?: string
  image: string
}

export function mapSongFromLookup(data: any): Song {
  return {
    id: data.trackId.toString(),
    title: data.trackName,
    artist: data.artistName,
    albumId: data.collectionId.toString(),
    albumTitle: data.collectionName,
    duration: formatDuration(data.trackTimeMillis),
    previewUrl: data.previewUrl,
    image: data.artworkUrl100
  }
}

export function formatDuration(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export interface AlbumRss {
    'im:name': ITunesLabel;
    rights: ITunesLabel;
    'im:image': ITunesImage[];
    'im:itemCount': ITunesLabel;
    'im:price': ITunesPrice;
    'im:contentType': {
        'im:contentType': {
            attributes: {
                term: string;
                label: string;
            }
        };
        attributes: {
            term: string;
            label: string;
        }
    };
    title: ITunesLabel;
    link: {
        attributes: {
            rel: string;
            type: string;
            href: string;
        }
    };
    id: ITunesId;
    'im:artist': ITunesLabel & {
        attributes: {
            href: string;
        }
    };
    category: ITunesCategory;
    'im:releaseDate': ITunesDate;
}

export interface AlbumLookup {
    wrapperType: string;
    collectionType: string;
    artistId: number;
    collectionId: number;
    amgArtistId: number;
    artistName: string;
    collectionName: string;
    collectionCensoredName: string;
    artistViewUrl: string;
    collectionViewUrl: string;
    artworkUrl60: string;
    artworkUrl100: string;
    collectionPrice: number;
    collectionExplicitness: string;
    trackCount: number;
    copyright: string;
    country: string;
    currency: string;
    releaseDate: string;
    primaryGenreName: string;
    songs?: {
        trackId: number;
        trackName: string;
        artistName: string;
        collectionId: number;
        collectionName: string;
        trackTimeMillis: number;
        previewUrl?: string;
        artworkUrl100: string;
    }[];
}

export function mapAlbumFromRss(data: AlbumRss): Album {
    return {
        id: data.id.attributes['im:id'],
        title: data['im:name'].label,
        artist: data['im:artist'].label,
        image: data['im:image'][2].label, 
        price: parseFloat(data['im:price'].attributes.amount),
        currency: data['im:price'].attributes.currency,
        releaseDate: data['im:releaseDate'].label,
        genre: data.category.attributes.label,
        copyright: data.rights.label
    }
}

export function mapAlbumFromLookup(data: AlbumLookup): Album {
    return {
        id: data.collectionId.toString(),
        title: data.collectionName,
        artist: data.artistName,
        image: data.artworkUrl100,
        price: data.collectionPrice,
        currency: data.currency,
        releaseDate: data.releaseDate,
        genre: data.primaryGenreName,
        copyright: data.copyright,
        songs: data.songs?.map(song => ({
            id: song.trackId.toString(),
            title: song.trackName,
            artist: song.artistName,
            albumId: song.collectionId.toString(),
            albumTitle: song.collectionName,
            duration: formatDuration(song.trackTimeMillis),
            previewUrl: song.previewUrl,
            image: song.artworkUrl100
        }))
    }
}

export interface SongLookup {
  wrapperType: string;
  kind: string;
  trackId: number;
  trackName: string;
  artistName: string;
  collectionId: number;
  collectionName: string;
  trackTimeMillis: number;
  previewUrl?: string;
  artworkUrl100?: string;
  trackNumber: number;
  trackCount: number;
} 