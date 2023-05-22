import { useEffect, useState } from 'react'
import '../src/styles/App.css'
import SearchBox from './components/SearchBox'
import TrackListItem from './components/TrackListItem'
import { iTrackListDetails } from './modules/Interfaces'
import { ApiClient } from './modules/Credentials'

function App() {
	const [trackLists, setTrackLists] = useState<iTrackListDetails[]>([])
	const [searchValue, setSearchValue] = useState<string>('')
	const [nextValue, setNextValue] = useState<number>(0)
	const [searchNextValue, setSearchNextValue] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [artistPage, setArtistPage] = useState<number>(0)

	const getTrendingTracks = async () => {
		setIsLoading(true)
		try {
			let result = await ApiClient.get(`?q=trending${nextValue ? '&index='+nextValue : ''}`)
			if (result && result.data.data) {
				setTrackLists((current) => [...current, ...result.data.data])
				if (result.data.next) {
					let next = result.data.next.split('&index=')[1]
					console.log('next: ', next, 'result.data.data: ', result.data.data.length)
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
			let result = await ApiClient.get(`?q=${searchValue}${searchNextValue ? '&index='+searchNextValue : ''}`)
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
				{artistPage ? (
					<div className="">

					</div>
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
								onArtistClick={(id) => {setArtistPage(id)}}
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
