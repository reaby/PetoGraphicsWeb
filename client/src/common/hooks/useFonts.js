import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getFonts = async () => {
    const response = await axios.get('/api/fonts');
    return response.data;
};

const useFonts = () => useQuery(['fonts'], getFonts);

export default useFonts;
