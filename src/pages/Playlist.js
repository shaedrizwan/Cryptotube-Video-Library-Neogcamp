import "../stylesheets/history.css";
import { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import axios from "axios";
import "../stylesheets/playlist.css"
import { SemipolarLoading } from "react-loadingg";
import{ AddPlaylist, PlaylistList} from "../components"

export function Playlist(){
    const {token} = useAuth()
    const [list,setPlaylist] = useState();

    useEffect(()=>{
        (async function (){
            const response = await axios.get('https://cryptotube-backend.herokuapp.com/user/playlist',{
                headers:{
                    Authorization:token
                }
            })
            if(response.status === 200){
                setPlaylist(response.data.playlist);
            }
        })()
    },[token])


    return(
        <>
        <AddPlaylist list={list} setPlaylist={setPlaylist}/>

        <h2 style={{color:"white"}}>Playists</h2>
        <div>
            {!list && <SemipolarLoading size="large" color="yellow"/>}
            {list && list.map(item =>{
                return <PlaylistList list={list} setPlaylist={setPlaylist} item={item}/>
            })}
            {list && list.length === 0 && <h1 style={{color:"white",margin:"2rem"}}>No saved playlist</h1>}
        </div>
        </>
    ) 
}