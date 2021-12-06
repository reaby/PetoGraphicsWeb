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

const isCountdownActive = (graphic, countdowns) => countdowns.find((item) => item.id === graphic.id) ? true : false;

const startCountdown = (graphic, setCountdowns, updateGraphic) => {
    let hours;
    let minutes;
    let seconds;
    const [hoursString = '00', minutesString = '00', secondsString = '00' ] = graphic.countdown.time.split(':');
    if (graphic.countdown.type === 'remaining') {
        hours = Number(hoursString);
        minutes = Number(minutesString);
        seconds = Number(secondsString);
    } else {
        const now = new Date();
        const startAt = new Date();
        startAt.setHours(Number(hoursString), Number(minutesString), Number(secondsString), 0);
        let remainingSeconds = (startAt.getTime() - now.getTime()) / 1000;
        hours = Math.floor(remainingSeconds / 3600);
        remainingSeconds %= 3600;
        minutes = Math.floor(remainingSeconds / 60);
        seconds = Math.floor(remainingSeconds % 60);
    }
    const interval = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            stopCountdown(graphic);
            return;
        }
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
            }
        }
        updateGraphic(graphic.id, 'texts[0].content', graphic.countdown.format
            .replace('hh', ('0' + hours).slice(-2))
            .replace('h', hours)
            .replace('mm', ('0' + minutes).slice(-2))
            .replace('m', minutes)
            .replace('ss', ('0' + seconds).slice(-2))
            .replace('s', seconds)
        );
    }, 1000);
    setCountdowns((prev) => [
        ...prev,
        {
            id: graphic.id,
            interval: interval
        }
    ]);
};

const stopCountdown = (graphic, setCountdowns) => {
    setCountdowns((prev) => {
        const index = prev.findIndex((item) => item.id === graphic.id);
        if (index === -1) {
            return prev;
        }
        const clone = [...prev];
        clearInterval(clone[index].interval);
        clone.splice(index, 1);
        return clone;
    });
};

const getCountdownActions = (graphic, updateGraphic, countdowns, setCountdowns) => (
    <>
        <Button
            variant='contained'
            color='secondary'
            sx={{ width: 100, mr: 2 }}
            onClick={() => {
                stopCountdown(graphic, setCountdowns);
                startCountdown(graphic, setCountdowns, updateGraphic);
            }}
        >
            Reset
        </Button>
        <Button
            variant='contained'
            color={isCountdownActive(graphic, countdowns) ? 'primary' : 'secondary'}
            onClick={(event) => {
                if (isCountdownActive(graphic, countdowns)) {
                    stopCountdown(graphic, setCountdowns);
                } else {
                    startCountdown(graphic, setCountdowns, updateGraphic);
                }
                event.stopPropagation();
            }}
            sx={{ width: 100, mr: 2 }}
        >
            {isCountdownActive(graphic, countdowns) ? 'Stop' : 'Start'}
        </Button>
    </>
);

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
                    <ListItemSecondaryAction>
                        {graphic.countdown && getCountdownActions(graphic, updateGraphic, countdowns, setCountdowns)}
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
