import { useEffect, useState } from 'react'
import '../src/styles/App.css'
import SearchBox from './components/SearchBox'
import TrackListItem from './components/TrackListItem'
import ArtistView from './components/ArtistView'
import { iTrackListDetails } from './modules/Interfaces'
import { ApiClient } from './modules/Credentials'

function App() {
	const [trackLists, setTrackLists] = useState<iTrackListDetails[]>([])
	const [searchValue, setSearchValue] = useState<string>('')
	const [nextValue, setNextValue] = useState<number>(0)
	const [searchNextValue, setSearchNextValue] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [artistPageID, setArtistPageID] = useState<number>(0)

	const getTrendingTracks = async () => {
		setIsLoading(true)
		try {
			let result = await ApiClient.get(`/search?q=trending${nextValue ? '&index='+nextValue : ''}`)
			if (result && result.data.data) {
				setTrackLists((current) => [...current, ...result.data.data])
				if (result.data.next) {
					let next = result.data.next.split('&index=')[1]
					setNextValue(Number(next))
				} else {
					setNextValue(0)
				}
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	const getSearchedTracks = async () => {
		setIsLoading(true)
		try {
			let result = await ApiClient.get(`/search?q=${searchValue}${searchNextValue ? '&index='+searchNextValue : ''}`)
			if (result && result.data.data) {
				setTrackLists(result.data.data)
				if (result.data.next) {
					let next = result.data.next.split('&index=')[1]
					setSearchNextValue(Number(next))
				} else {
					setSearchNextValue(0)
				}
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	const handleScroll = () => {
		if(((document.documentElement.scrollTop + document.documentElement.offsetHeight) > document.documentElement.scrollHeight) && isLoading === false) {
			if (searchNextValue) {
				getSearchedTracks()
			}
			 
			if (nextValue) {
				getTrendingTracks()
			}
		}
	}

	useEffect(() => {
		if (searchValue) {
			getSearchedTracks()
		}
	}, [searchValue])

	useEffect(() => {
		getTrendingTracks()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div className="App">
			<div className="AppContainer">
				{artistPageID ? (
					<ArtistView id={artistPageID} />
				) : (
					<div className="AppHome">
						<SearchBox setSearchValue={setSearchValue} />

						<div className="TrackListItems">
							{trackLists && trackLists.length ? trackLists.map((value, index) => <TrackListItem 
								artistID={value.artist.id} 
								imageUrl={value.album.cover} 
								duration={value.duration} 
								tractTitle={value.title} 
								albumTitle={value.album.title} 
								nameOfArtist={value.artist.name}
								onArtistClick={(id) => {
									setArtistPageID(id)
								}}
								key={index}
							/>) : ''}
						</div>
					</div>
				)}

				{/* <ArtistView artistPageDetails={artistPageDetails} /> */}
			</div>
		</div>
	)
}

export default App
