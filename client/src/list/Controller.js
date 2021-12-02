import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

const Controller = memo(({ graphic, selectedGraphicId, setSelectedGraphicId, updateGraphic, onDragStart, onDragOver, onDrop, ...props }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <ListItem
                onClick={() => setSelectedGraphicId(graphic.id)}
                disablePadding
                draggable
                onDragStart={(event) => onDragStart(event, graphic)}
                onDragOver={onDragOver}
                onDrop={(event) => onDrop(event, graphic)}
                sx={{ height: 56 }}
                {...props}
            >
                <ListItemButton selected={selectedGraphicId === graphic.id}>
                    {graphic.children.length > 0 && (
                        <Box onClick={() => setCollapsed((prev) => !prev)} sx={{ display: 'flex', alignItems: 'center' }}>
                            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
                        </Box>
                    )}
                    <ListItemText primary={graphic.name} />
                    <ListItemSecondaryAction>
                        <Button
                            variant='contained'
                            color={graphic.visible ? 'primary' : 'secondary'}
                            onClick={(event) => {
                                updateGraphic(graphic.id, 'visible', !graphic.visible, true);
                                event.stopPropagation();
                            }}
                            sx={{ width: 100 }}
                        >
                            {graphic.visible ? 'Hide' : 'Show'}
                        </Button>
                    </ListItemSecondaryAction>
                </ListItemButton>
            </ListItem>
            {!collapsed && graphic.children.length > 0 && (
                <Box sx={{ ml: 2 }}>
                    {graphic.children.map((child) => (
                        <Controller
                            key={child.id}
                            graphic={child}
                            selectedGraphicId={selectedGraphicId}
                            setSelectedGraphicId={setSelectedGraphicId}
                            updateGraphic={updateGraphic}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                        />
                    ))}
                </Box>
            )}
        </>
    );
});

Controller.propTypes = {
    graphic: PropTypes.object.isRequired,
    selectedGraphicId: PropTypes.string,
    setSelectedGraphicId: PropTypes.func.isRequired,
    updateGraphic: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
};

export default Controller;
