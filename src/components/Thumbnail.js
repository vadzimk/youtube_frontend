import React from "react";

const styles = {
    thumbnail: {
        flex: 'calc(100% / 3)',
        textAlign: 'center',
        flexGrow: 1,
        flexShrink:0,
        paddingLeft: '2rem',
        paddingRight: '2rem',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    imageStyle: {
        maxWidth: '100%',
        height: 'auto'
    },
    textStyle: {
        padding: '1rem'
    }
}

const Thumbnail =({videoItem})=>{

    return (
        <div className="ui container" style={styles.thumbnail}>
            <img
                src={videoItem.snippet.thumbnails.medium.url}
                alt={videoItem.snippet.description}
                style={styles.imageStyle}
            />
            <div>
                {videoItem.snippet.title}
            </div>
        </div>
    )
}

export default Thumbnail;