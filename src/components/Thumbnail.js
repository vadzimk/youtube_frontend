import React from "react";



const Thumbnail = ({videoItem, handleThumbnailClick}) => {

    return (
        <div className="card">
            <div className="image">
                <img
                    src={videoItem.snippet.thumbnails.medium.url}
                    alt={videoItem.snippet.description}
                    onClick={() => handleThumbnailClick(videoItem)}
                />
            </div>
            <div className="content">
                <div className="header">
                    {videoItem.snippet.title}
                </div>
                <div className="description">
                    {videoItem.snippet.description}
                </div>
            </div>
        </div>
    )
}

export default Thumbnail;