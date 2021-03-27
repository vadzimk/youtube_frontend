import axios from 'axios';

const baseUrl = '/api/channel';


const getNextPage = ({q, pageToken, maxResults}) => {
    const params = {}
    if (q) params.q = q;
    if (pageToken) params.pageToken = pageToken;
    if (maxResults) params.maxResults = maxResults;


    return axios.get(baseUrl, {params}).then(res => res.data);
}


const channelService = {getNextPage}
export default channelService;