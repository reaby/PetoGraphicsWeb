import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { showMessage } from 'common/components/Notifier';
import axios from 'axios';

const AddProjectDialog = ({ open, onClose, onAdd }) => {
    const [project, setProject] = useState('');
    useEffect(() => {
        if (open) {
            setProject('');
        }
    }, [open]);

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
        >
            <DialogTitle>New project</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    autoFocus
                    label='Name'
                    type='text'
                    margin='normal'
                    fullWidth
                    value={project}
                    onChange={(event) => setProject(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    onClick={onClose}
                >
                    Close
                </Button>
                <Button
                    color='primary'
                    onClick={async () => {
                        try {
                            await axios.post('/api/projects', { project });
                            onAdd(project);
                        } catch (error) {
                            if (error.response) showMessage(error.response.data, true);
                        }
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AddProjectDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default AddProjectDialog;
