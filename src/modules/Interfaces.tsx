export interface iArtistDetails {
    id:number
    name:string
    link:string
    share:string
    picture:string
    picture_small:string
    picture_medium:string
    picture_big:string
    picture_xl:string
    nb_album:number
    nb_fan:number
    radio:number
    tracklist:string
    type:string
}

export interface iTrackListDetails {
    id:number
    readable:boolean
    title:string
    title_short:string
    title_version:string
    link:string
    duration:number
    rank:number
    explicit_lyrics:false
    explicit_content_lyrics:number
    explicit_content_cover:number
    preview:string
    md5_image:string
    artist: {
        id:number
        name:string
        link:string
        picture:string
        picture_small:string
        picture_medium:string
        picture_big:string
        picture_xl:string
        tracklist:string
        type:string
    }
    album: {
        id:number
        title:string
        cover:string
        cover_small:string
        cover_medium:string
        cover_big:string
        cover_xl:string
        md5_image:string
        tracklist:string
        type:string
    }
    type:string
}

export interface iAlbumDetails {
    id:number
    title:string
    link:string
    cover:string
    cover_small:string
    cover_medium:string
    cover_big:string
    cover_xl:string
    md5_image:string
    genre_id:number
    fans:number
    release_date:string
    record_type:string
    tracklist:string
    explicit_lyrics:boolean
    type:string
}

export interface iArtistPageDetails {
    artistDetails?:iArtistDetails
    trackList?:iTrackListDetails[]
    albumList?:iAlbumDetails[]
}

