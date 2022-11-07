import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import useCountdowns from 'common/hooks/useCountdowns';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const isCountdownActive = (id, countdowns) =>
    countdowns.find((item) => item.id === id) ? true : false;

const startCountdown = (id, graphicCountdown, setCountdowns, updateGraphic) => {
    let hours;
    let minutes;
    let seconds;
    const [hoursString = '00', minutesString = '00', secondsString = '00'] =
        graphicCountdown.time.split(':');
    if (graphicCountdown.type === 'remaining') {
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
            stopCountdown(id, setCountdowns);
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
            id,
            'texts[0].content',
            graphicCountdown.format
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
            id: id,
            interval: interval,
        },
    ]);
};

const stopCountdown = (id, setCountdowns) => {
    setCountdowns((prev) => {
        const index = prev.findIndex((item) => item.id === id);
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
    const graphicCountdown = useProject((state) => findGraphic(state.config, id).countdown);
    const updateGraphic = useProject((state) => state.updateGraphic);
    const { countdowns, setCountdowns } = useCountdowns();
    return (
        <>
            <Button
                variant='contained'
                color='secondary'
                sx={{ width: 100, mr: 2 }}
                onClick={() => {
                    stopCountdown(id, setCountdowns);
                    startCountdown(id, graphicCountdown, setCountdowns, updateGraphic);
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
                        startCountdown(id, graphicCountdown, setCountdowns, updateGraphic);
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
