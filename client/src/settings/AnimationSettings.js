import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnimationProperties from './AnimationProperties';

const AnimationSettings = ({ selectedGraphic, updateGraphic, collapsed, setCollapsed }) => {
    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='subtitle1' sx={{ flex: 1 }}>Animation Settings</Typography>
                    <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
                    </IconButton>
                </Box>
                <Divider />
            </Grid>
            {!collapsed && (
                <>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2' gutterBottom>Animation In</Typography>
                    </Grid>
                    <AnimationProperties path='animationIn' {...selectedGraphic.animationIn} id={selectedGraphic.id} updateGraphic={updateGraphic} />
                    <Grid item xs={12}>
                        <Typography variant='subtitle2' gutterBottom>Animation Out</Typography>
                    </Grid>
                    <AnimationProperties path='animationOut' {...selectedGraphic.animationOut} id={selectedGraphic.id} updateGraphic={updateGraphic} />
                </>
            )}
        </>
    );

};

export default AnimationSettings;
