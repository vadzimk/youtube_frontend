import React, {useState, useEffect} from 'react';
import SearchBox from "./components/SearchBox.js";
import channelService from './services/channel.js';

import Grid from "./components/Grid.js";
import VideoPlayerModal from "./components/VideoPlayerModal.js";
import PageNumberList from "./components/PageNumberList.js";

const App = () => {
    const [videoItems, setVideoItems] = useState([]);
    const [totalResults, setTotalResults] = useState(null);
    const [nextPageToken, setNextPageToken] = useState('',);
    const [query, setQuery] = useState('');
    const [selectedPageNumber, setSelectedPageNumber] = useState(1);
    const [pageVideoItems, setPageVideoItems] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const MAX_PAGES = 10;
    const MAX_ITEMS_PER_PAGE = 12;

    const getItems = (data) => {
        if (!data.items) {
            return [];
        }
        return data.items;
    }

    const handleSelectPage = async (pageNumber) => {
        const indexStart = (pageNumber - 1) * MAX_ITEMS_PER_PAGE;
        const indexEnd = Math.min(indexStart + MAX_ITEMS_PER_PAGE, videoItems.length - 1);
        setSelectedPageNumber(pageNumber);
        if (pageNumber <= Math.floor(videoItems.length / MAX_ITEMS_PER_PAGE)) {
            setPageVideoItems(videoItems.slice(indexStart, indexEnd));
        } else {
            // may make recursive calls
            const data = await channelService.getNextPage({
                q: query,
                maxResults: MAX_PAGES * MAX_ITEMS_PER_PAGE,
                pageToken: nextPageToken
            });
            setVideoItems(videoItems.concat(getItems(data)));
            setNextPageToken(data.nextPageToken);
        }
        setSelectedPageNumber(pageNumber);
    }

    useEffect(() => {
        channelService.getNextPage({
            maxResults: MAX_PAGES * MAX_ITEMS_PER_PAGE
        }).then(data => {
            setVideoItems(getItems(data));
            setTotalResults(data.pageInfo.totalResults);
            setNextPageToken(data.nextPageToken);
        });

    }, []);

    useEffect(() => {
        handleSelectPage(selectedPageNumber);
    }, [videoItems])


    const handleSearch = async (query) => {
        setQuery(query);
        try {
            const data = await channelService.getNextPage({
                maxResults: MAX_PAGES * MAX_ITEMS_PER_PAGE,
                q: query
            });
            setVideoItems(getItems(data));
            await handleSelectPage(1);
        } catch (e) {
            console.log(e);
        }
    }

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleThumbnailClick = (videoItem) => {
        setSelectedVideo(videoItem);
        openModal();
    }

    const numPagesResult = Math.ceil(totalResults / MAX_ITEMS_PER_PAGE);

    return (
        <div className="container ui">
            <SearchBox handleSearch={handleSearch}/>
            <Grid videoItems={pageVideoItems}
                  handleThumbnailClick={handleThumbnailClick}
            />
            <PageNumberList
                handleSelectPage={handleSelectPage}
                activePage={selectedPageNumber}
                totalPages={numPagesResult}
            />
            <VideoPlayerModal
                isModalOpen={isModalOpen}
                onClose={closeModal}
                selectedVideo={selectedVideo}
            />
        </div>
    );
}


export default App;