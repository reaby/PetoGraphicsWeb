import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getProjects = async () => {
    const response = await axios.get('/api/projects');
    return response.data;
};

const useProjects = () => useQuery(['projects'], getProjects);

export default useProjects;
