import React, {useState, useEffect} from 'react';
import SearchBox from "./components/SearchBox.js";
import channelService from './services/channel.js';

import Grid from "./components/Grid.js";
import VideoPlayerModal from "./components/VideoPlayerModal.js";

const App = () => {
    const [videoItems, setVideoItems] = useState([]);
    const [notification, setNotification] = useState({message: '', isError: false});
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const notify = (message, isError = false) => {
        console.log(message)
        setNotification({message, isError})
        setTimeout(() => setNotification({message: '', isError: false}), 5000)
    }

    const getItems = (data) => {
        if (!data.items) {
            notify(data.error, true)
            return []
        }
        return data.items;
    }


    useEffect(() => {
        channelService.getAll().then(data => {
            setVideoItems(getItems(data));
        });

    }, []);

    const handleSearch = async (q) => {
        try {
            const data = await channelService.search(q);
            setVideoItems(getItems(data));
        } catch (e) {
            console.log(e);
        }
    }


    const openModal=()=>setModalOpen(true);
    const closeModal=()=>setModalOpen(false);

    const handleThumbnailClick = (videoItem)=>{
        console.log("selected", videoItem);
        setSelectedVideo(videoItem);
        openModal();
    }

    return (
        <div className="container ui">
            <SearchBox handleSearch={handleSearch}/>

            <div style={{marginTop: '20px'}}>
                <Grid videoItems={videoItems}
                      handleThumbnailClick={handleThumbnailClick}
                />
            </div>
            <VideoPlayerModal
                isModalOpen={isModalOpen}
                onClose={closeModal}
                selectedVideo={selectedVideo}
            />
        </div>
    );
}


export default App;