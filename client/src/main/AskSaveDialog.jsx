import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { showMessage } from 'common/components/Notifier';
import axios from 'axios';
import useProject from 'common/hooks/useProject';

const AskSaveDialog = ({ open, onClose, name }) => (
    <Dialog
        fullWidth
        open={open}
        onClose={onClose}
    >
        <DialogTitle>Save current project</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Do you want to save current project before switching?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                color='primary'
                onClick={onClose}
            >
                Skip
            </Button>
            <Button
                color='primary'
                onClick={async () => {
                    try {
                        const { config } = useProject.getState();
                        await axios.put(`/api/projects/${name}`, {
                            config,
                        });
                        showMessage('Config saved');
                        onClose();
                    } catch (error) {
                        if (error.response) showMessage(error.response.data, true);
                    }
                }}
            >
                Save
            </Button>
        </DialogActions>
    </Dialog>
);

AskSaveDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    name: PropTypes.string,
};

export default AskSaveDialog;
