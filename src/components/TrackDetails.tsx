import '../styles/TrackDetails.css'

interface Props {
	artistPageDetails:any
}

function TrackDetailsItem({artistPageDetails}:Props) {
	return (
		<div className="TrackDetailsItem">
			<div className="TrackDetailsItemContainer">
				<h1>{artistPageDetails.name}</h1>
			</div>
		</div>
	)
}

export default TrackDetailsItem
