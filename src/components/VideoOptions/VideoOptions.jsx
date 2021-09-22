import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../authContext'
import "./VideoOptions.css"

function VideoOptions({Icon,title,type,videoId}) {
    const [color,setColor] = useState(false)
    const {token} = useAuth()

    useState(()=>{
        (
            async function(){
                if(type === "likedVideo"){
                    const response = await axios.post("https://cryptotube-library.herokuapp.com/user/isLiked",{
                    videoId:videoId
                    },{
                        headers:{
                            authorization:token
                        }
                    })
                    if(response.status === 200){
                        setColor(response.data.isLiked)
                    }
                }
            }
        )()
    },[])

    return (
        <div className="video-options">
            {Icon && <Icon className={color?"colored":"uncolored"}/>}
            <div className="nav-title">{title}</div>
        </div>
    )
}

export default VideoOptions
