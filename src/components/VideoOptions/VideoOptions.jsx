import React from 'react'
import "./VideoOptions.css"

function VideoOptions({Icon,title}) {
    return (
        <div className="video-options">
            {Icon && <Icon style={{fontSize:"2rem"}}/>}
            <div className="nav-title">{title}</div>
        </div>
    )
}

export default VideoOptions
