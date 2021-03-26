import React from 'react';
import Thumbnail from "./Thumbnail.js";

const styles = {
    thumbnailContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    }
}

const Grid =({videoItems})=>{
    return (
        <div className="ui container" style={styles.thumbnailContainer}>
            {
                videoItems.map(videoItem=><Thumbnail videoItem={videoItem}/>)
            }
        </div>
    )
}

export default Grid;