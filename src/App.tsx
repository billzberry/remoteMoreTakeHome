import { useEffect, useState } from 'react'
import '../src/styles/App.css'
import SearchBox from './components/SearchBox'
import TrackListItem from './components/TrackListItem'
import TrackDetails from './components/TrackDetails'
import { iTrackListDetails } from './modules/Interfaces'
import { ApiClient } from './modules/Credentials'

function App() {
	const [trackLists, setTrackLists] = useState<iTrackListDetails[]>([])
	const [searchValue, setSearchValue] = useState<string>('')
	const [nextValue, setNextValue] = useState<number>(0)
	const [searchNextValue, setSearchNextValue] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [artistPageID, setArtistPageID] = useState<number>(0)
	const [artistPageDetails, setArtistPageDetails] = useState<any>({})

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
				if (searchNextValue) {
					setTrackLists((current) => [...current, ...result.data.data])
				} else {
					setTrackLists(result.data.data)
				}
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

	const getTractDetails = async (id:number) => {
		for (let i = 0; i < trackLists.length; i++) {
			if (trackLists[i].artist.id === id) {
				setArtistPageDetails(trackLists[i].artist)
				break
			}
		}

		let topTrackList = await ApiClient.get(`/artist/${id}/top`)
		if (topTrackList && topTrackList.data) {
			const data = {...artistPageDetails, trackList: [...topTrackList.data.data]}
			setArtistPageDetails(data)
			console.log('artistPageDetails:', artistPageDetails)
		}

		let albumList = await ApiClient.get(`/artist/${id}/top`)
		if (albumList && albumList.data) {
			const data = {...artistPageDetails, albumList: [...albumList.data.data]}
			setArtistPageDetails(data)
			console.log('artistPageDetails:', artistPageDetails)
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
					<TrackDetails artistPageDetails />
				) : (
					<>
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
									getTractDetails(id)
								}}
								key={index}
							/>) : ''}
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default App
