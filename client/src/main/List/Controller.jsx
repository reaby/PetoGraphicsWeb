import { useState } from 'react';
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
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';
import _isEqual from 'lodash/isEqual';

const secondsToTime = (input) => {
    let remainingSeconds = input;
    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds %= 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.floor(remainingSeconds % 60);
    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
};

const useControllerState = (id) =>
    useProject((state) => {
        const target = findGraphic(state.config, id);
        return {
            name: target.name,
            visible: target.visible,
            countdown: target.countdown,
            video: target.video,
            playlist: target.playlist,
            children: target.children.map((item) => item.id),
            selectedGraphic: state.selectedGraphic,
            setSelectedGraphic: state.setSelectedGraphic,
            updateGraphic: state.updateGraphic,
        };
    }, _isEqual);

const Controller = ({ id, onDragStart, onDragOver, onDrop, ...props }) => {
    const {
        name,
        visible,
        children,
        countdown,
        video,
        playlist,
        selectedGraphic,
        setSelectedGraphic,
        updateGraphic,
    } = useControllerState(id);
    const [collapsed, setCollapsed] = useState(true);
    return (
        <>
            <ListItem
                onClick={() => setSelectedGraphic(id)}
                disablePadding
                draggable
                onDragStart={(event) => onDragStart(event, id)}
                onDragOver={onDragOver}
                onDrop={(event) => onDrop(event, id)}
                sx={{ height: 56 }}
                {...props}
            >
                <ListItemButton
                    selected={selectedGraphic === id}
                    disableRipple
                >
                    {children.length > 0 && (
                        <Box
                            onClick={() => setCollapsed((prev) => !prev)}
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </Box>
                    )}
                    <ListItemText primary={name} />
                    <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                        {countdown && <CountdownActions id={id} />}
                        {video && (
                            <Typography
                                variant='subtitle1'
                                sx={{ mr: 2 }}
                            >
                                {video.currentTime === 0
                                    ? secondsToTime(video.duration)
                                    : secondsToTime(video.duration - video.currentTime)}
                            </Typography>
                        )}
                        {playlist && (
                            <Typography
                                variant='subtitle1'
                                sx={{ mr: 2 }}
                            >
                                {playlist.currentTime === 0
                                    ? secondsToTime(
                                          playlist.durations.reduce(
                                              (partial_sum, a) => partial_sum + a,
                                              0
                                          )
                                      )
                                    : secondsToTime(
                                          playlist.durations.reduce(
                                              (partial_sum, a) => partial_sum + a,
                                              0
                                          ) - playlist.currentTime
                                      )}
                            </Typography>
                        )}
                        <Button
                            variant='contained'
                            color={visible ? 'primary' : 'secondary'}
                            onClick={(event) => {
                                updateGraphic(id, 'visible', !visible, true);
                                event.stopPropagation();
                            }}
                            sx={{ width: 100 }}
                        >
                            {visible ? 'Hide' : 'Show'}
                        </Button>
                    </ListItemSecondaryAction>
                </ListItemButton>
            </ListItem>
            {!collapsed && children.length > 0 && (
                <Box sx={{ ml: 2 }}>
                    {children.map((childId) => (
                        <Controller
                            key={childId}
                            id={childId}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                        />
                    ))}
                </Box>
            )}
        </>
    );
};

Controller.propTypes = {
    id: PropTypes.string.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
};

export default Controller;
