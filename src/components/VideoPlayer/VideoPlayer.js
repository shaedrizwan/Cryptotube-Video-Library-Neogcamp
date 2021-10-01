import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import "./VideoPlayer.css"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { useNavigate } from 'react-router-dom'
import {useAuth} from "../../authContext"


function VideoPlayer({video}) {

    const [playlistPopup,setPlaylistPopup] = useState(false)
    const [playlist,setPlaylist] = useState({})
    const {token} = useAuth();
    const navigate = useNavigate()
    const [isLiked,setIsLiked] = useState(false)
    const [isAddedToWatchlater,setIsAddedToWatchlater] = useState(false)

    useEffect(()=>{
        if(token){
            (
                async function(){
                    const response = await axios.get('https://cryptotube-library.herokuapp.com/user/playlist',{
                        headers:{
                            Authorization:token
                        }
                    })
                    setPlaylist(response.data.playlist)
                }
            )()
        }
    },[token])

    useState(()=>{
        if(token){
            (
                async function(){
                    const response = await axios.post("https://cryptotube-library.herokuapp.com/user/isLiked",{
                    videoId:video._id
                    },{
                        headers:{
                            authorization:token
                        }
                    })
                    if(response.status === 200){
                        setIsLiked(response.data.isLiked)
                    }
                }
            )()
        }
    },[token])

    useState(()=>{
        if(token){
            (
                async function(){
                    const response = await axios.post("https://cryptotube-library.herokuapp.com/user/isAddedToWatchlater",{
                    videoId:video._id
                    },{
                        headers:{
                            authorization:token
                        }
                    })
                    if(response.status === 200){
                        setIsAddedToWatchlater(response.data.isAddedToWatchlater)
                    }
                }
            )()
        }
    },[token])


    const likeButtonPressed = async(id) =>{
        if(!isLiked){
            try{
                const response = await axios.post(`https://cryptotube-library.herokuapp.com/user/addToLikedvideos`,{
                    videoId:id
                },{
                headers:{
                    Authorization:token
                }
                })
                if(response.status === 200){
                    toast.success(`Video successfully added to Liked Videos!!`,{
                        position:toast.POSITION.BOTTOM_RIGHT
                    })
                    setIsLiked(true)
                }
            }catch{
                toast.error(`Failed to add video to Liked Videos!`,{
                    position:toast.POSITION.BOTTOM_RIGHT
                })
            }
        }else{
            try{
                const response = await axios.post(`https://cryptotube-library.herokuapp.com/user/removeFromLikedvideos`,{
                    videoId:id
                },{
                headers:{
                    Authorization:token
                }
                })
                if(response.status === 200){
                    toast.success(`Video successfully removed from Liked Videos!!`,{
                        position:toast.POSITION.BOTTOM_RIGHT
                    })
                    setIsLiked(false)
                }
            }catch{
                toast.error(`Failed to remove video from Liked Videos!`,{
                    position:toast.POSITION.BOTTOM_RIGHT
                })
            }
        }
    }

    const watchlaterButtonPressed = async(id) =>{
        if(!isAddedToWatchlater){
            try{
                const response = await axios.post(`https://cryptotube-library.herokuapp.com/user/addToWatchlater`,{
                    videoId:id
                },{
                headers:{
                    Authorization:token
                }
                })
                if(response.status === 200){
                    toast.success(`Video successfully added to Watch Later!!`,{
                        position:toast.POSITION.BOTTOM_RIGHT
                    })
                    setIsAddedToWatchlater(true)
                }
            }catch{
                toast.error(`Failed to add video to Watch Later!`,{
                    position:toast.POSITION.BOTTOM_RIGHT
                })
            }
        }else{
            try{
                const response = await axios.post(`https://cryptotube-library.herokuapp.com/user/removeFromWatchlater`,{
                    videoId:id
                },{
                headers:{
                    Authorization:token
                }
                })
                if(response.status === 200){
                    toast.success(`Video successfully removed from Watch Later!!`,{
                        position:toast.POSITION.BOTTOM_RIGHT
                    })
                    setIsAddedToWatchlater(false)
                }
            }catch{
                toast.error(`Failed to remove video from Watch Later!`,{
                    position:toast.POSITION.BOTTOM_RIGHT
                })
            }
        }
    }

    const addToPlaylist = async (list,video) =>{
        setPlaylistPopup(false)
        const response = await axios.post(`https://cryptotube-library.herokuapp.com/user/addToPlaylist`,{
            playlist:list,
            videoId:video._id
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
        setPlaylist(playlist.map(item => item.playlistName === list? {...item,videos:[...item.videos,video]}:item ))
        }
    }

    const removeFromPlaylist = async (list,video) =>{
        setPlaylistPopup(false)
        console.log(list)
        console.log(video)
        const response = await axios.post('https://cryptotube-library.herokuapp.com/user/removeFromPlaylist',{
            playlistName:list,
            videoId: video._id
        },{
            headers:{
                Authorization:token
            }
        })
        if(response.status === 200){
            toast.success(`Video successfully removed to ${list}`,{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
        setPlaylist(playlist.map(item => item.playlistName === list? {...item,videos:item.videos.filter(vid => vid._id !== video._id)}:item ))
        }
    }


    return (
        <div>
            <iframe src={`${video.youtube_url}?autoplay=1`}
                className="video-iframe"
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
            />
            <div className="title">{video.title}</div>
        
            <div className="attr-container">
                <div onClick={()=>likeButtonPressed(video._id)} className="attr-items">
                    <ThumbUpAltIcon className={isLiked?"colored":"uncolored"}/>
                    <div className="nav-title">Like</div>
                </div>
                <div onClick={()=>setPlaylistPopup(toggle => !toggle)} className="attr-items">
                    <PlaylistAddIcon className="uncolored"/>
                    <div className="nav-title">Playlist</div>
                </div>
                {playlistPopup && <div className="playlist-popup">
                    {!token && navigate('/login')}
                    {token && playlist.length !== 0 && playlist.map((list)=>{
                        return <div onClick={()=>list.videos.find(vid => vid._id === video._id)?removeFromPlaylist(list.playlistName,video):addToPlaylist(list.playlistName,video)} key={list._id} className={list.videos.find(vid => vid._id === video._id)?"present-playlist-popup-items":"playlist-popup-items"}>{list.playlistName}{list.videos.find(vid => vid._id === video._id)? <PlaylistAddCheckIcon className="playlist-icon"/> : <PlaylistAddIcon className="playlist-icon"/>} </div>
                    })}
                    {token && playlist.length === 0 && <div className={{color:"white"}}>No playlist present</div>}
                </div>}
                <div onClick={()=>watchlaterButtonPressed(video._id)} className="attr-items">
                    <WatchLaterIcon className={isAddedToWatchlater?"colored":"uncolored"}/>
                    <div className="nav-title">Watchlater</div>
                </div>
            </div>

            <div className="details-container">
                <img src={video.channel_thumbnail} alt="profile" className="channel-thumbnail" />
                <div className="details-container-right">
                    <div className="details-channel">{video.channel_name}</div>
                    <div className="details-date">{video.published_date}</div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
