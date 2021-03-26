import React, {useState, useEffect} from 'react';
import SearchBox from "./components/SearchBox.js";
import channelService from './services/channel.js';

import Grid from "./components/Grid.js";



const App = () => {
    const [videoItems, setVideoItems] = useState([]);
    const [notification, setNotification] = useState({message: '', isError: false});

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

    return (
        <div className="container ui">
            <SearchBox handleSearch={handleSearch}/>
            <Grid videoItems={videoItems}/>
        </div>
    );
}


export default App;