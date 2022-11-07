import { useQuery, useMutation } from '@tanstack/react-query';
import { showMessage } from 'common/components/Notifier';
import axios from 'axios';

const getProjects = async () => {
    const response = await axios.get('/api/projects');
    return response.data;
};

const addProject = async (name) => {
    const response = await axios.post('/api/projects', { name });
    return response.data;
};

const useProjects = () => {
    const { data: projects, refetch } = useQuery(['projects'], getProjects);
    const { mutate: add } = useMutation(addProject, {
        onSuccess: () => {
            refetch();
        },
        onError: (error) => {
            if (error.response) showMessage(error.response.data, true);
        },
    });
    return { projects, add };
};

export default useProjects;
