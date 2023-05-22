import '../src/styles/App.css'
import SearchBox from './components/SearchBox'
import TrackListItem from './components/TrackListItem'

function App() {
	return (
		<div className="App">
			<div className="AppContainer">
				<SearchBox />

				<TrackListItem />
			</div>
		</div>
	)
}

export default App
