import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import useCountdowns from 'common/hooks/useCountdowns';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const isCountdownActive = (id, countdowns) =>
    countdowns.find((item) => item.id === id) ? true : false;

let hours = {};
let minutes= {};
let seconds= {};
let isPaused = {};

const startCountdown = (id, graphicCountdown, setCountdowns, updateGraphic) => {
    const [hoursString = '00', minutesString = '00', secondsString = '00'] =
        graphicCountdown.time.split(':');
    if (graphicCountdown.type === 'remaining') {
        if (!isPaused[id]) {
            hours[id]= Number(hoursString);
            minutes[id] = Number(minutesString);
            seconds[id] = Number(secondsString);
        }
    } else {
        const now = new Date();
        const startAt = new Date();
        startAt.setHours(Number(hoursString), Number(minutesString), Number(secondsString), 0);
        let remainingSeconds = (startAt.getTime() - now.getTime()) / 1000;
        hours[id] = Math.floor(remainingSeconds / 3600);
        remainingSeconds %= 3600;
        minutes[id] = Math.floor(remainingSeconds / 60);
        seconds[id] = Math.floor(remainingSeconds % 60);
    }
    const interval = setInterval(() => {
        if (hours[id] === 0 && minutes[id] === 0 && seconds[id] === 0) {
            stopCountdown(id, setCountdowns);
            return;
        }
        seconds[id]--;
        if (seconds[id] < 0) {
            seconds[id] = 59;
            minutes[id]--;
            if (minutes[id] < 0) {
                minutes[id] = 59;
                hours[id]--;
            }
        }
        updateGraphic(
            id,
            'texts[0].content',
            graphicCountdown.format
                .replace('hh', ('0' + hours[id]).slice(-2))
                .replace('h', hours[id])
                .replace('mm', ('0' + minutes[id]).slice(-2))
                .replace('m', minutes[id])
                .replace('ss', ('0' + seconds[id]).slice(-2))
                .replace('s', seconds[id])
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
        isPaused[id] =  false;
        const clone = [...prev];
        clearInterval(clone[index].interval);
        clone.splice(index, 1);
        return clone;
    });
};


const pauseCountdown = (id, setCountdowns) => {
    setCountdowns((prev) => {
        const index = prev.findIndex((item) => item.id === id);        
        if (index === -1) {
            return prev;
        }
        const clone = [...prev];                
        clearInterval(clone[index].interval);
        clone.splice(index, 1);
        isPaused[id] = true;
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
                    isPaused[id] = false;
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
                        pauseCountdown(id, setCountdowns, graphicCountdown);
                    } else {
                        startCountdown(id, graphicCountdown, setCountdowns, updateGraphic);
                    }
                    event.stopPropagation();
                }}
                sx={{ width: 100, mr: 2 }}
            >
                {isCountdownActive(id, countdowns) ? 'Pause' : 'Start'}
            </Button>
        </>
    );
};

CountdownActions.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CountdownActions;
