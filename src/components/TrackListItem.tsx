import { getDuration } from '../modules/Credentials'
import '../styles/TrackListItem.css'

interface Props {
	artistID:number
	imageUrl:string
	duration:number
	tractTitle:string
	albumTitle:string
	nameOfArtist:string
	onArtistClick:(id:number) => void
}

function TrackListItem({artistID, imageUrl, duration, tractTitle, albumTitle, nameOfArtist, onArtistClick}:Props) {
	

	return (
		<div className="TrackListItem">
			<div className="TrackListItem-container">
				<a href="#!" className="TrackListItem-image">
					<img className="TrackListItem-image-img" src={imageUrl} alt="Track art"/>
				</a>
				<div className="TrackListItem-content">
					<p> {getDuration(duration)} </p>

					<h1>
						<a href="#!">{tractTitle}</a>
					</h1>

					<p>
						<a href="#!" onClick={() => onArtistClick(artistID)}>By {nameOfArtist}</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default TrackListItem
