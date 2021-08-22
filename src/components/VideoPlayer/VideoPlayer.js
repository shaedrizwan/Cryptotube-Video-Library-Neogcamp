import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import "./VideoPlayer.css"
import VideoOptions from "../VideoOptions/VideoOptions"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {useAuth} from "../../authContext"
import { useNavigate } from 'react-router-dom'


function VideoPlayer({video}) {

    const [playlistPopup,setPlaylistPopup] = useState(false)
    const [playlist,setPlaylist] = useState({})
    const {token} = useAuth();
    const navigate = useNavigate()

    // useEffect(()=>{
    //     (async function (){
            // const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
            //     headers:{
            //         Authorization:token
            //     }
            // })
            // setPlaylist(response.data.playlist)
    //     })()
    // },[token])
    useEffect(()=>{
        if(token){
            (
                async function(){
                    const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
                        headers:{
                            Authorization:token
                        }
                    })
                    setPlaylist(response.data.playlist)
                }
            )()
        }
    },[token])


    const updateVideoList = async(id,type) =>{
        try{
            const response = await axios.post(`https://cryptotube-backend.herokuapp.com/user/addTo${type}`,{
                videoId:id
            },{
            headers:{
                Authorization:token
            }
            })
            if(response.status === 200){
                toast.success(`Video successfully added to ${type}!!`,{
                    position:toast.POSITION.BOTTOM_RIGHT
                })
            }
        }catch{
            toast.error(`Failed to add video to ${type}!`,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    const addToPlaylist = async (list,videoId) =>{
        setPlaylistPopup(false)
        const response = await axios.post(`https://cryptotube-backend.herokuapp.com/user/addToPlaylist`,{
            playlist:list,
            videoId:videoId
        },{
        headers:{
            Authorization:token
        }
        })
        if(response.status === 200){
            toast.success(`Video successfully added to ${list}`,{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
        }
    }


    return (
        <div>
            <iframe src={video.youtube_url}
                className="video-iframe"
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
            />
            <div className="title">{video.title}</div>
        
            <div className="attr-container">
                <div onClick={()=>updateVideoList(video._id,"Likedvideos")} className="attr-items">
                    <VideoOptions Icon={ThumbUpAltIcon} title="Like"/>
                </div>
                <div onClick={()=>setPlaylistPopup(toggle => !toggle)} className="attr-items">
                <VideoOptions Icon={PlaylistAddIcon} title="Playlist"/>
                </div>
                {playlistPopup && <div className="playlist-popup">
                    {!token && navigate('/login')}
                    {token && playlist.length !== 0 && playlist.map((list)=>{
                        return <div onClick={()=>addToPlaylist(list.playlistName,video._id)} key={list._id} className="playlist-popup-items">{list.playlistName}</div>
                    })}
                    {token && playlist.length === 0 && <div className={{color:"white"}}>No playlist present</div>}
                </div>}
                <div onClick={()=>updateVideoList(video._id,"Watchlater")} className="attr-items">
                <VideoOptions Icon={WatchLaterIcon} title="Watchlater"/>
                </div>
            </div>

            <div className="details-container">
                <img src="https://yt3.ggpht.com/ytc/AKedOLRKlMd8XiIOUXc9DKEjUgt5fFy1OJgYkN9tF90F4w=s68-c-k-c0x00ffffff-no-rj" alt="profile" className="channel-thumbnail" />
                <div className="details-container-right">
                    <div className="details-channel">{video.channel_name}</div>
                    <div className="details-date">{video.published_date}</div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
