import React from 'react';
import {Modal} from "semantic-ui-react";


const VideoPlayerModal = ({isModalOpen, onClose, selectedVideo})=>{
    if (!selectedVideo) return null;

    const videoUrl = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;

    return(
        <Modal
            basic
            open={isModalOpen}
            onClose={onClose}
        >
            <Modal.Content>
                <div className="ui embed">
                    <iframe
                        src={videoUrl}
                        allowFullScreen={true}
                        title="Video player"
                    />
                </div>

            </Modal.Content>

        </Modal>
    )
}

export default VideoPlayerModal;