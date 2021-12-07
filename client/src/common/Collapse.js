import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Collapse = ({ title, children, collapsed, setCollapsed, ...props }) => (
    <>
        <Grid item xs={12} {...props}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setCollapsed((prev) => !prev)}>
                <Typography variant='subtitle1' sx={{ flex: 1 }}>{title}</Typography>
                <IconButton>
                    {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
                </IconButton>
            </Box>
            <Divider />
        </Grid>
        {!collapsed && (
            <>
                {children}
            </>
        )}
    </>
);

Collapse.propTypes = {
    title: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
};

export default Collapse;
