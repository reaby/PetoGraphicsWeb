import { useMutation, useQuery } from '@tanstack/react-query';
import { showMessage } from 'common/components/Notifier';
import axios from 'axios';

const getFiles = async () => {
    const response = await axios.get('/api/files');
    return response.data;
};

const addFile = async (data) => {
    const response = await axios.post('/api/files', data);
    return response.data;
};

const useFiles = () => {
    const { data: files, refetch } = useQuery(['files'], getFiles);
    const { mutate: upload, loading: uploading } = useMutation(addFile, {
        onSuccess: () => {
            refetch();
        },
        onError: (error) => {
            if (error.response) showMessage(error.response.data, true);
        },
    });
    return { files, upload, uploading };
};

export default useFiles;
