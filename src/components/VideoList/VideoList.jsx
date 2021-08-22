import React from 'react'
import "./VideoList.css"
import {Link} from "react-router-dom"

function VideoList({video,dispatchFunction}) {
    return (
        <div className="video-container" key={video._id}>
            <Link className="video-link-wrapper" to={`/video/${video.slug}`}>
                <img className="video-thumbnail" src={video.thumbnail} alt={video.slug}/>
                <div className="video-title">{video.title}</div>
                <div className="video-details-container">
                    <img src="https://yt3.ggpht.com/ytc/AKedOLRKlMd8XiIOUXc9DKEjUgt5fFy1OJgYkN9tF90F4w=s68-c-k-c0x00ffffff-no-rj" className="video-channel-thumbnail" alt="profile" />
                    <div>
                        <div className="video-channel">{video.channel_name}</div>
                        <div className="video-date">{video.published_date}</div>
                    </div>
                </div>
            </Link>
            {dispatchFunction && <button className="clear-button" onClick={()=>dispatchFunction()}>Remove</button>}
        </div>
    )
}

export default VideoList
