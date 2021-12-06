import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import UploadButton from '../common/UploadButton';

const isVideo = (file) => {
    const extensions = ['ogg', 'webm', 'mp4'];
    for (const extension of extensions) {
        if (file.endsWith(`.${extension}`)) {
            return true;
        }
    }
    return false;
};

const Video = ({ id, video, updateGraphic, files, refreshFiles }) => (
    <>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label='Source'
                type='text'
                value={video.source ?? ''}
                onChange={(event) => updateGraphic(id, 'video.source', event.target.value)}
                fullWidth
                select
                sx={{ mr: 1 }}
            >
                {files?.filter(isVideo).map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
            </TextField>
            <UploadButton identifier='upload-video' accept='video/*' onUpload={(value) => {
                refreshFiles();
                updateGraphic(id, 'video.source', value[0]?.name);
            }} />
        </Grid>
        <Grid item xs={12}>
            <FormControlLabel control={
                <Checkbox
                    checked={video.loop}
                    onChange={(event) => updateGraphic(id, 'video.loop', event.target.checked)}
                />
            } label='Loop' />
        </Grid>
    </>
);

export default Video;
