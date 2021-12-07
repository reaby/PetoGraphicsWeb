import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import CountdownActions from './CountdownActions';

const secondsToTime = (input) => {
    let remainingSeconds = input;
    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds %= 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.floor(remainingSeconds % 60);
    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
};

const Controller = memo(({ graphic, selectedGraphicId, setSelectedGraphicId, updateGraphic, countdowns, setCountdowns, onDragStart, onDragOver, onDrop, ...props }) => {
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
                <ListItemButton selected={selectedGraphicId === graphic.id} disableRipple>
                    {graphic.children.length > 0 && (
                        <Box onClick={() => setCollapsed((prev) => !prev)} sx={{ display: 'flex', alignItems: 'center' }}>
                            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
                        </Box>
                    )}
                    <ListItemText primary={graphic.name} />
                    <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                        {graphic.countdown && <CountdownActions graphic={graphic} updateGraphic={updateGraphic} countdowns={countdowns} setCountdowns={setCountdowns} />}
                        {graphic.video && <Typography variant='subtitle1' sx={{ mr: 2 }}>{secondsToTime(graphic.video.duration)}</Typography>}
                        {graphic.playlist && <Typography variant='subtitle1' sx={{ mr: 2 }}>{secondsToTime(graphic.playlist.duration)}</Typography>}
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
                            countdowns={countdowns}
                            setCountdowns={setCountdowns}
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
    countdowns: PropTypes.array.isRequired,
    setCountdowns: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
};

export default Controller;
