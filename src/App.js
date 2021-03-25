import React, {useState, useEffect} from 'react';
import SearchBox from "./components/SearchBox.js";
import channelService from './services/channel.js';

const App = () => {

    const [videoIDs, setVideoIDs] = useState([]);

    useEffect(() => {
        channelService.getAll().then(data => {
            const ids = data.items.map(item => item.id.videoId);
            setVideoIDs(ids);
        });

    }, []);

    const handleSearch = async (q) => {
        try {
            const data = await channelService.search(q);
            const ids = data.items.map(item => item.id.videoId);
            setVideoIDs(ids);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <SearchBox handleSearch={handleSearch}/>
            {
                videoIDs.map(id => <div>{id}</div>)
            }
        </div>
    );
}


export default App;