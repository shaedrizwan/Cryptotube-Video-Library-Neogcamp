import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useAuth } from "../authContext"
import axios from 'axios'
import "../stylesheets/history.css"
import { VideoList } from "../components"
import {SemipolarLoading} from "react-loadingg"
import { toast } from "react-toastify"

export  function PlaylistVideos(){
    const {name} = useParams()
    const pName = decodeURI(name)
    const {token} = useAuth()
    const [playlistVideos,setPlaylistVideos] = useState([])
    
    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                const playlist = response.data.playlist.find(list=>list.playlistName === pName)
                setPlaylistVideos(playlist.videos)
            }
        })()

    },[pName,token])

    const RemoveButtonPressed = async (id) =>{
        setPlaylistVideos(playlistVideos.filter(video => video._id !== id))
        toast.success('Video removed successfully from the playlist',{
            position:toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        })
        const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/removeFromPlaylist',{
            playlistName:pName,
            videoId: id
        },{
            headers:{
                Authorization:token
            }
        })
        if(response.status !== 200){
            toast.error('Failed to remove from playlist',{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
        }
    }

    return(
        <>
            <h2 style={{color:"white"}}>Playlist: {pName}</h2>
            <div className="video-wrap">
                {!PlaylistVideos && <SemipolarLoading color="yellow" size="large" /> }
                {playlistVideos.length === 0 && <h1 style={{color:"white",margin:"2rem"}}>No videos in the playlist</h1>}
                {playlistVideos && playlistVideos.map(video=>{
                    return <VideoList key={video._id} video={video} dispatchFunction={()=>RemoveButtonPressed(video._id)}/>
                })}
            </div>
        </>
    )
}