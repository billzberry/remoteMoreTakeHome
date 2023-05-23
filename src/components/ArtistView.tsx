import { useEffect, useState } from 'react'
import { ApiClient, getDuration } from '../modules/Credentials'
import { iAlbumDetails, iArtistDetails, iTrackListDetails } from '../modules/Interfaces'
import '../styles/ArtistView.css'

interface Props {
	id:number
}

interface iTrackListItem {
	number:number
	title:string
	duration:number
}

interface iAlbumListDetails {
	albumInfo:iAlbumDetails
}

function ArtistView({id}:Props) {
	const [artistDetails, setArtistDetails] = useState<iArtistDetails|null>(null)
	const [topTrackList, setTopTrackList] = useState<iTrackListDetails[]>([])
	const [albumList, setAlbumList] = useState<iAlbumDetails[]>([])

	const getTractDetails = async (id:number) => {
		let artistDetails = await ApiClient.get(`/artist/${id}`)
		if (artistDetails && artistDetails.data) {
			setArtistDetails(artistDetails.data)
		}

		let topTrackList = await ApiClient.get(`/artist/${id}/top`)
		if (topTrackList && topTrackList.data) {
			setTopTrackList(topTrackList.data.data)
		}

		let albumList = await ApiClient.get(`/artist/${id}/albums`)
		if (albumList && albumList.data) {
			setAlbumList(albumList.data.data)
		}
		
	}

	const displayTopFiveTracks = (tracks?:iTrackListDetails[]) => {
		let result = []
		if (tracks && tracks.length) {
			for (let i = 0; i < 5; i++) {
				if (tracks[i]) result.push(tracks[i])
			}
		}
		return result
	}

	const TrackListItem = ({number, title, duration}:iTrackListItem) => {
		return (
			<div className="topTracksItem">
				<div className="trackNumber">{number}</div>
				<div className="trackTitle">{title}</div>
				<div className="trackDuration">{getDuration(duration)}</div>
			</div>
		)
	}

	const AlbumsList = ({albumInfo}:iAlbumListDetails) => {
		return (
			<div className="TrackListItem-container">
				<a href="#!" className="TrackListItem-image">
					<img className="TrackListItem-image-img" src={albumInfo.cover} alt="Track art"/>
				</a>
				<div className="TrackListItem-content">
					<h1>
						<a href="#!">{albumInfo.title}</a>
					</h1>

					<p>{albumInfo.release_date && new Date(albumInfo.release_date).getUTCFullYear()}</p>
				</div>
			</div>
		)
	}

	useEffect(() => {
		getTractDetails(id)
	}, [])

	return (
		<div className="TrackDetailsItem">
			<div className="TrackDetailsItemContainer">
				<div className="sectionOne">
					<div className="coverArt" style={{
							backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${artistDetails?.picture})`,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center'
						}}>
						<div className="textInfo">
							<h1>{artistDetails?.name}</h1>
							<h6>{artistDetails?.nb_fan} fans</h6>
							<hr />
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eveniet officiis vero ab voluptatem voluptates beatae ratione optio temporibus enim iusto ipsam dicta vel rem quod quo, nulla error perferendis.</p>
						</div>
					</div>

					<div className="topTracks">
						<h2>Top Tracks</h2>
						<ul>
							{displayTopFiveTracks(topTrackList).map((value, index) => (
								<li key={index}>
									<TrackListItem number={index + 1} title={value.title} duration={value.duration}/>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="sectionTwo">
					<h2>Albums</h2>
					<div className="albumsRow">
						{albumList.map((value, index) => (
							<AlbumsList albumInfo={value} key={index}/>
						))}
					</div>
				</div>
			</div> 
		</div>
	)
}

export default ArtistView
