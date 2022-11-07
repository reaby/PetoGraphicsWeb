import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const useCountdownState = (id) => useProject((state) => findGraphic(state.config, id).countdown);

const Countdown = ({ id }) => {
    const countdown = useCountdownState(id);
    const updateGraphic = useProject((state) => state.updateGraphic);
    return (
        <>
            <Grid
                item
                xs={12}
            >
                <FormControl
                    fullWidth
                    sx={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <FormLabel sx={{ mr: 3 }}>Type</FormLabel>
                    <RadioGroup
                        row
                        value={countdown.type ?? 'remaining'}
                        onChange={(event) =>
                            updateGraphic(id, 'countdown.type', event.target.value)
                        }
                    >
                        <FormControlLabel
                            value='remaining'
                            control={<Radio />}
                            label='Remaining'
                        />
                        <FormControlLabel
                            value='starts'
                            control={<Radio />}
                            label='Starts at'
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <TextField
                    label='Time'
                    type='time'
                    value={countdown.time ?? ''}
                    onChange={(event) => updateGraphic(id, 'countdown.time', event.target.value)}
                    fullWidth
                    inputProps={{
                        step: '1',
                        required: true,
                    }}
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <TextField
                    label='Format'
                    type='text'
                    value={countdown.format ?? ''}
                    onChange={(event) => updateGraphic(id, 'countdown.format', event.target.value)}
                    fullWidth
                />
            </Grid>
        </>
    );
};

Countdown.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Countdown;
