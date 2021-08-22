import React from 'react'
import "./PlaylistList.css"
import {toast} from "react-toastify"
import axios from 'axios'
import {Link} from "react-router-dom"
import { useAuth } from '../../authContext'

function PlaylistList({item,list,setPlaylist}) {
    const {token} = useAuth()

    const RemovePlaylistPressed = async (playlistName) =>{
        setPlaylist(list.filter(item => item.playlistName !== playlistName))
        toast.success('Playlist removed successfully',{
            position:toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        })
        const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/removePlaylist',{
            playlistName:playlistName
        },{
            headers:{
                Authorization:token
            }
        })
        if(response.status !== 200){
            toast.error('Playlist removing failed',{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
        }
    }

    return (
            <div className="playlist-card" key={item._id}>
                    <Link className="playlist-link" to={`/playlist/${item.playlistName}`}>
                    <div className="playlist-name">{item.playlistName}</div>
                    <div className="playlist-total-videos">Total videos: {item.videos.length}</div>
                    </Link>
                    <button onClick={()=>RemovePlaylistPressed(item.playlistName)} className="clear-button">Remove</button>
            </div>
    )
}

export default PlaylistList
