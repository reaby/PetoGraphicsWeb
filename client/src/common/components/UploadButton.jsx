import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { showMessage } from 'common/components/Notifier';
import axios from 'axios';

const UploadButton = ({ accept, onUpload }) => {
    const id = useId();
    const [uploading, setUploading] = useState(false);

    if (uploading) {
        return (
            <Box sx={{ height: 40, padding: 1 }}>
                <CircularProgress
                    size={24}
                    sx={{ display: 'inline-block' }}
                />
            </Box>
        );
    }
    return (
        <Tooltip title='Upload'>
            <label htmlFor={id}>
                <input
                    id={id}
                    accept={accept}
                    type='file'
                    multiple
                    style={{ display: 'none' }}
                    onChange={async (event) => {
                        const data = new FormData();
                        for (const file of event.target.files) {
                            data.append('files', file);
                        }
                        setUploading(true);
                        try {
                            await axios.post('/api/files', data);
                            onUpload(event.target.files);
                        } catch (error) {
                            if (error.response) showMessage(error.response.data, true);
                        }
                        setUploading(false);
                    }}
                />
                <IconButton component='span'>
                    <UploadFileIcon />
                </IconButton>
            </label>
        </Tooltip>
    );
};

UploadButton.propTypes = {
    accept: PropTypes.string.isRequired,
    onUpload: PropTypes.func.isRequired,
};

export default UploadButton;
