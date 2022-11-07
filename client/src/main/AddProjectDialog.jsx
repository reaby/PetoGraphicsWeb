import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import useProjects from 'common/hooks/useProjects';

const AddProjectDialog = ({ open, onClose, onAdd }) => {
    const { add } = useProjects();
    const [name, setName] = useState('');
    useEffect(() => {
        if (open) {
            setName('');
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
                    value={name}
                    onChange={(event) => setName(event.target.value)}
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
                    onClick={() => {
                        add(name, {
                            onSuccess: () => onAdd(name),
                        });
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
