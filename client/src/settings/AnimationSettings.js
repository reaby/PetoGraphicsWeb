import { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Collapse from '../common/Collapse';
import AnimationProperties from './AnimationProperties';

const AnimationSettings = memo(({ id, animationIn, animationOut, updateGraphic, collapsed, setCollapsed }) => (
    <Collapse title='Animation Settings' collapsed={collapsed} setCollapsed={setCollapsed}>
        <Grid item xs={12}>
            <Typography variant='subtitle2' gutterBottom>Animation In</Typography>
        </Grid>
        <AnimationProperties path='animationIn' {...animationIn} id={id} updateGraphic={updateGraphic} />
        <Grid item xs={12}>
            <Typography variant='subtitle2' gutterBottom>Animation Out</Typography>
        </Grid>
        <AnimationProperties path='animationOut' {...animationOut} id={id} updateGraphic={updateGraphic} />
    </Collapse>
));

AnimationSettings.propTypes = {
    id: PropTypes.string.isRequired,
    animationIn: PropTypes.object.isRequired,
    animationOut: PropTypes.object.isRequired,
    updateGraphic: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired
};

export default AnimationSettings;
