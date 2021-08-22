import '../stylesheets/home-style.css';
import {useVideo} from "../videoContext";
import { CommonLoading } from 'react-loadingg';
import { VideoList } from "../components";

export function Home(){
    const {dispatchHistory,videosDB} = useVideo();
    return(
        <div className="video-wrapper">
            {!videosDB && <CommonLoading color="yellow" size="large"/>}
            {videosDB && videosDB.length === 0 && <CommonLoading color="yellow" size="large"/>}
            {videosDB && videosDB.map(video=>{
                return <div onClick={()=>dispatchHistory({type:"addToHistory",payload:video})}>
                    <VideoList key={video._id} video={video}/>
                </div>
            })}
        </div>
    )
}