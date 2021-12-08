import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import fetch from '../common/functions/fetchWrap';
import { showMessage } from '../common/Notifier';

const AskSaveDialog = ({ open, onClose, project, config }) => (
    <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>Save current project</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Do you want to save current project before switching?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={onClose}>
                Skip
            </Button>
            <Button color='primary' onClick={() => {
                fetch(`/api/projects/${project}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        config
                    })
                })
                    .then(() => {
                        showMessage('Config saved');
                        onClose();
                    })
                    .catch(console.error);
            }}>
                Save
            </Button>
        </DialogActions>
    </Dialog>
);

AskSaveDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    project: PropTypes.string,
    config: PropTypes.array.isRequired
};

export default AskSaveDialog;
