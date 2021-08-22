import "../stylesheets/history.css";
import { useAuth } from "../authContext";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import axios from "axios";
import { SemipolarLoading } from 'react-loadingg';
import { VideoList } from "../components";

export function LikedVideos(){

    const {token} = useAuth();

    const [likedVideos,setLikedVideos] = useState()

    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/likedvideos',{
                headers:{
                    Authorization:token
                }
            })
            setLikedVideos(response.data.likedvideos);
        })()
    },[token])

    const RemoveFromLikedvideos = async (id) =>{
        try{
            const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/removeFromLikedvideos',{
                videoId: id
            },{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                setLikedVideos(likedVideos.filter(video => video._id !== id))
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
        <h2 style={{color:"white"}}>Your Liked Videos:</h2>
        <div className="video-wrap">
            {likedVideos && likedVideos.map(video=>{
                return <VideoList key={video._id} video={video} dispatchFunction={()=>RemoveFromLikedvideos(video._id)}/>
            })}
            {!likedVideos && <SemipolarLoading size="large" color="yellow"/>}
            {likedVideos && likedVideos.length === 0 && <h1 style={{color:"white",margin:"1rem"}}>You do not have any Liked Videos</h1>}
        </div>
        </>
    )
} 