import {useVideo} from "../videoContext";
import "../stylesheets/history.css";
import { VideoList } from "../components";

export function History(){
    const {state} = useVideo();
    const {dispatchHistory} = useVideo();
    return(
        <>
        <h2 style={{color:"white"}}>Your Watch History:</h2>
        {state.length !== 0 && <button className="clear-button" onClick={()=>dispatchHistory({type:"clearHistory"})}>Clear History</button>}
        <div className="video-wrap">
            {state.length === 0 && <h1 style={{color:"white"}}>You did not watch any video</h1>}
            {state && state.map((video) =>{
                return <VideoList key={video._id} video={video} dispatchFunction={()=>dispatchHistory({type:"removeFromHistory",payload:video})} />
            })}
        </div>
        </>
    )
}