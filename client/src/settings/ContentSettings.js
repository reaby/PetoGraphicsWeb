import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadButton from '../common/UploadButton';

const Content = ({ selectedGraphic, updateGraphic, collapsed, setCollapsed }) => {
    console.log('Render Content');
    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setCollapsed((prev) => !prev)}>
                    <Typography variant='subtitle1' sx={{ flex: 1 }}>Content</Typography>
                    <IconButton>
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
                                minRows={4}
                            />
                        </Grid>
                    ))}
                    {selectedGraphic.media && (
                        <>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    label='Source'
                                    type='text'
                                    value={selectedGraphic.media.source ?? ''}
                                    onChange={(event) => updateGraphic(selectedGraphic.id, 'media.source', event.target.value)}
                                    fullWidth
                                    sx={{ mr: 1 }}
                                />
                                <UploadButton identifier='upload-media' accept='video/*,audio/*' onUpload={(value) => updateGraphic(selectedGraphic.id, 'media.source', value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={selectedGraphic.media.loop}
                                        onChange={(event) => updateGraphic(selectedGraphic.id, 'media.loop', event.target.checked)}
                                    />
                                } label='Loop' />
                            </Grid>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Content;
