import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import useCountdowns from 'common/hooks/useCountdowns';
import useProjects from 'common/hooks/useProjects';

const isCountdownActive = (graphic, countdowns) =>
    countdowns.find((item) => item.id === graphic.id) ? true : false;

const startCountdown = (graphic, setCountdowns, updateGraphic) => {
    let hours;
    let minutes;
    let seconds;
    const [hoursString = '00', minutesString = '00', secondsString = '00'] =
        graphic.countdown.time.split(':');
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
        updateGraphic(
            graphic.id,
            'texts[0].content',
            graphic.countdown.format
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
            interval: interval,
        },
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

const CountdownActions = ({ id }) => {
    const updateGraphic = useProjects((state) => state.updateGraphic);
    const { countdowns, setCountdowns } = useCountdowns();
    return (
        <>
            <Button
                variant='contained'
                color='secondary'
                sx={{ width: 100, mr: 2 }}
                onClick={() => {
                    stopCountdown(id, setCountdowns);
                    startCountdown(id, setCountdowns, updateGraphic);
                }}
            >
                Reset
            </Button>
            <Button
                variant='contained'
                color={isCountdownActive(id, countdowns) ? 'primary' : 'secondary'}
                onClick={(event) => {
                    if (isCountdownActive(id, countdowns)) {
                        stopCountdown(id, setCountdowns);
                    } else {
                        startCountdown(id, setCountdowns, updateGraphic);
                    }
                    event.stopPropagation();
                }}
                sx={{ width: 100, mr: 2 }}
            >
                {isCountdownActive(id, countdowns) ? 'Stop' : 'Start'}
            </Button>
        </>
    );
};

CountdownActions.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CountdownActions;
