import axios from 'axios';

const baseUrl = '/api/channel';


const getAll = async () => {
   return axios.get(`${baseUrl}`).then(res=>res.data);
}

const search = async (q)=>{
   return await axios.get(`${baseUrl}?q=${q}`).then(res=>res.data);
}

const channelService = {getAll, search}
export default channelService;