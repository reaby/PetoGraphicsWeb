import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Grow from '@mui/material/Grow';

let showMessageFn;

const Notifier = ({ anchorOrigin, autoHideDuration, transitionComponent }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);
    showMessageFn = (message, error = false) => {
        setMessage(message);
        setOpen(true);
        setError(error);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            anchorOrigin={anchorOrigin}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            TransitionComponent={transitionComponent}
        >
            <SnackbarContent
                sx={
                    error
                        ? { background: theme.palette.error.dark }
                        : { background: theme.palette.primary.main }
                }
                message={message}
            />
        </Snackbar>
    );
};

export const showMessage = (value, error = false) => {
    showMessageFn(value, error);
};

Notifier.propTypes = {
    autoHideDuration: PropTypes.number.isRequired,
    anchorOrigin: PropTypes.object.isRequired,
    transitionComponent: PropTypes.elementType.isRequired
};

Notifier.defaultProps = {
    autoHideDuration: 4000,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
    },
    transitionComponent: Grow
};

export default Notifier;
