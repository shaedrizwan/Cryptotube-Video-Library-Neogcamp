import React, {useState} from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import "./AddPlaylist.css"
import { useAuth } from '../../authContext'

function AddPlaylist({list,setPlaylist}) {
    const [newPlaylist,setNewPlaylist] = useState('')
    const {token} = useAuth()

    const AddPlaylistPressed = async () =>{
        setPlaylist([...list,{playlistName:newPlaylist,_id:uuid(),videos:[]}])
        toast.success('Playlist added successfully',{
            position:toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        })
        const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/createPlaylist',{
            playlistName:newPlaylist
        },{
            headers:{
                Authorization:token
            }
        })
        if(response.status !== 200){
            toast.error('Playlist creation failed',{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
        }
    }

    return (
        <div>
            <h2 style={{color:"white"}}>Add new playlist</h2>
            <div className="new-playlist-title">Enter playlist name</div>
            <input className="new-playlist-input" onChange={e=>setNewPlaylist(e.target.value)} placeholder="Playlist name" />
            <button className="new-playlist-button" onClick={AddPlaylistPressed}>Add</button>
        </div>
    )
}

export default AddPlaylist
