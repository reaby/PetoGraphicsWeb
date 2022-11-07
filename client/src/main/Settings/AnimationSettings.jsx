import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Collapse from 'common/components/Collapse';
import AnimationProperties from './AnimationProperties';

const AnimationSettings = ({ id, collapsed, setCollapsed }) => (
    <Collapse
        title='Animation Settings'
        collapsed={collapsed}
        setCollapsed={setCollapsed}
    >
        <Grid
            item
            xs={12}
        >
            <Typography
                variant='subtitle2'
                gutterBottom
            >
                Animation In
            </Typography>
        </Grid>
        <AnimationProperties
            path='animationIn'
            id={id}
        />
        <Grid
            item
            xs={12}
        >
            <Typography
                variant='subtitle2'
                gutterBottom
            >
                Animation Out
            </Typography>
        </Grid>
        <AnimationProperties
            path='animationOut'
            id={id}
        />
    </Collapse>
);

AnimationSettings.propTypes = {
    id: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};

export default AnimationSettings;
