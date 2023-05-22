import '../styles/SearchBox.css'

interface Props {
	setSearchValue:React.Dispatch<React.SetStateAction<string>>
}

function SearchBox({setSearchValue}:Props) {
	let timeOutChecker:NodeJS.Timeout
	
	const onSearch = (inputElement:EventTarget) => {
		const value = (inputElement as HTMLInputElement).value
		if (value) {
			timeOutChecker = setTimeout(() => {
				setSearchValue(value)
				clearTimeout(timeOutChecker)
			}, 1000)
		} else {
			setSearchValue('')
		}
	}

	return (
		<div className="SearchBox">
			<div className="SearchBoxContainer">
				<input type="text" className="input" placeholder='Search...' onKeyUp={(e) => onSearch(e.target)}/>
			</div>
		</div>
	)
}

export default SearchBox
