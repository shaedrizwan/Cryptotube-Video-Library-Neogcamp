import '../stylesheets/home-style.css';
import {useVideo} from "../videoContext";
import { CommonLoading } from 'react-loadingg';
import { SearchBar, VideoList } from "../components";

export function Home(){
    const {dispatchHistory,videosDB} = useVideo();
    return(
        <>
        <SearchBar/>
        <div className="video-wrapper">
            {!videosDB && <CommonLoading color="yellow" size="large"/>}
            {videosDB && videosDB.length === 0 && <CommonLoading color="yellow" size="large"/>}
            {videosDB && videosDB.map(video=>{
                return <div key={video._id} onClick={()=>dispatchHistory({type:"addToHistory",payload:video})}>
                    <VideoList video={video}/>
                </div>
            })}
        </div>
        </>
    )
}