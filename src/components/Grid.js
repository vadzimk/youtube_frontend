import React, {useState} from 'react';
import Thumbnail from "./Thumbnail.js";


const Grid = ({videoItems, handleThumbnailClick}) => {
    const [numColumnsClassName, setNumColumnsClassName] = useState('three');

    return (
        <div style={{marginTop: '20px'}}>
            <div className="ui form">
                <div className="ui inline fields" style={{justifyContent: 'flex-end'}}>
                    <div className="field">
                        <div className="ui radio checkbox" >
                            <input
                                type="radio"
                                value={numColumnsClassName}
                                checked={numColumnsClassName === 'three'}
                                onChange={() => setNumColumnsClassName('three')}
                            />
                            <label>3 columns</label>
                        </div>

                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                value={numColumnsClassName}
                                checked={numColumnsClassName === 'four'}
                                onChange={() => setNumColumnsClassName('four')}
                            />
                            <label>4 columns</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`ui ${numColumnsClassName} stackable cards`}>
                {
                    videoItems.map(videoItem =>
                        <Thumbnail
                            videoItem={videoItem}
                            key={videoItem.id.videoId}
                            handleThumbnailClick={handleThumbnailClick}
                        />)
                }
            </div>
        </div>

    )
}

export default Grid;