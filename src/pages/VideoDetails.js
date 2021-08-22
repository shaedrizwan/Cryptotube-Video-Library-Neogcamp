import {useParams} from "react-router-dom";
import '../stylesheets/videodetails.css';
import {useVideo} from "../videoContext";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VideoPlayer } from "../components";
import {SemipolarLoading} from "react-loadingg"

toast.configure()

export function VideoDetails(){
    const {slug} = useParams();
    const {videosDB} = useVideo();
    const video = videosDB.find(vid=>vid.slug === slug);


    return(
        <div className="video-main">
            {!video && <SemipolarLoading color="yellow" size="large" />}
            {video && <VideoPlayer video={video}/> }
        </div>
        )
}