import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Content = ({ selectedGraphic, updateGraphic, collapsed, setCollapsed }) => {
    console.log('Render Content');
    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='subtitle1' sx={{ flex: 1 }}>Content</Typography>
                    <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
                    </IconButton>
                </Box>
                <Divider />
            </Grid>
            {!collapsed && (
                <>
                    {selectedGraphic.texts.map((text, index) => (
                        <Grid key={index} item xs={12}>
                            <TextField
                                label={`Text ${index + 1}`}
                                type='text'
                                value={text.content ?? ''}
                                onChange={(event) => updateGraphic(selectedGraphic.id, `texts[${index}].content`, event.target.value)}
                                fullWidth
                                multiline={text.rich}
                                rows={4}
                            />
                        </Grid>
                    ))}
                </>
            )}
        </>
    );
};

export default Content;
