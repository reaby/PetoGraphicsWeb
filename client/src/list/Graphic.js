import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

const Graphic = memo(({ id, name, visible, selected, onSelect, updateGraphic }) => {
    console.log('Render ' + name);
    return (
        <ListItem onClick={() => onSelect(id)} disablePadding>
            <ListItemButton selected={selected}>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                    <Button
                        variant='contained'
                        color={visible ? 'primary' : 'secondary'}
                        onClick={(event) => {
                            updateGraphic(id, 'visible', !visible);
                            event.stopPropagation();
                        }}
                        sx={{ width: 100 }}
                    >
                        {visible ? 'Hide' : 'Show'}
                    </Button>
                </ListItemSecondaryAction>
            </ListItemButton>
        </ListItem>
    );
});

Graphic.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    updateGraphic: PropTypes.func.isRequired
};

export default Graphic;
