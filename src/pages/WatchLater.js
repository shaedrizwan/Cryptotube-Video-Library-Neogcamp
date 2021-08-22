import "../stylesheets/history.css";
import { useAuth } from "../authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {SemipolarLoading} from "react-loadingg";
import {VideoList} from "../components"


toast.configure()

export function WatchLater(){
    const {token} = useAuth();

    const [watchlater,setWatchlater] = useState()

    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/watchlater',{
                headers:{
                    Authorization:token
                }
            })
            setWatchlater(response.data.watchlater);
        })()
    },[token])


    const RemoveFromWatchlater = async (id) =>{
        try{
            const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/removeFromWatchlater',{
                videoId: id
            },{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                setWatchlater(watchlater.filter(video => video._id !== id))
                toast.success('Video removed successfully',{
                    position:toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000
                })
            }
        }
        catch{
            toast.error('Failed to remove the video!!',{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
        }
    }

    return(
        <>
        <h2 style={{color:"white"}}>Your Watch Later:</h2>
        <div className="video-wrap">
            {!watchlater && <SemipolarLoading size="large" color="yellow"/>}
            {watchlater && watchlater.length === 0 && <h1 style={{color:"white",margin:"1rem"}}>You do not have any videos in Watchlater</h1>}
            {watchlater && watchlater.length !== 0 && watchlater.map(video=>{
                return <VideoList key={video._id} video={video} dispatchFunction={()=>RemoveFromWatchlater(video._id)}/>
            })}
        </div>
        </>
    )
} 