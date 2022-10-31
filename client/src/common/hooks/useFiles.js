import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getFiles = async () => {
    const response = await axios.get('/api/files');
    return response.data;
};

const useFiles = () => useQuery(['files'], getFiles);

export default useFiles;
