import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import "./SearchBar.css"
import { useVideo } from '../../videoContext';
import { Link } from 'react-router-dom';

function SearchBar() {

    const [searchText,setSearchText] = useState("")
    const [searchOutput,setSearchOutput] = useState([])

    const {videosDB} = useVideo()

    const searchChangeHandler = (e) =>{
        const searchValue = e.target.value
        setSearchText(searchValue)
        setSearchOutput(videosDB.filter(video => video.title.toLowerCase().includes(searchValue.toLowerCase())))
    }

    const ClearSearch = () =>{
        setSearchText("")
        setSearchOutput([])
    }

    return (
        <div className="search-bar">
            <div className="search-input">
                <input type="text" value={searchText} onChange={searchChangeHandler} placeholder="Search for video..."/>
                {searchText.length !== 0 ? <CloseIcon className="search-icons" onClick={ClearSearch} />:<SearchIcon className="search-icons"/>}
            </div>
            { searchOutput.length !== 0 && searchText.length !==0 && <div className="search-output">
                {searchOutput.slice(0.10).map(video => <Link key={video._id} className="search-items" to={`/video/${video.slug}`}>{video.title}</Link>)}
            </div>}
        </div>
    )
}

export default SearchBar
