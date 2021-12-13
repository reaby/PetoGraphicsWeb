import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import UploadButton from '../common/UploadButton';
import isVideo from '../common/functions/isVideo';
import getVideoDuration from '../common/functions/getVideoDuration';

const Video = ({ id, video, updateGraphic, files, project, refreshFiles }) => (
    <>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label='Source'
                type='text'
                value={video.source ?? ''}
                onChange={(event) => {
                    updateGraphic(id, 'video.source', event.target.value);
                    getVideoDuration(`/configs/${project}/${event.target.value}`)
                        .then((duration) => {
                            updateGraphic(id, 'video.duration', duration);
                        })
                        .catch(console.error);
                }}
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
                getVideoDuration(`/configs/${project}/${value[0]?.name}`)
                    .then((duration) => {
                        updateGraphic(id, 'video.duration', duration);
                    })
                    .catch(console.error);
            }} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <FormControlLabel control={
                <Checkbox
                    checked={video.loop ?? false}
                    onChange={(event) => updateGraphic(id, 'video.loop', event.target.checked)}
                />
            } label='Loop' />
            <FormControlLabel control={
                <Checkbox
                    checked={video.hideOnEnd ?? false}
                    onChange={(event) => updateGraphic(id, 'video.hideOnEnd', event.target.checked)}
                />
            } label='Hide on End' />
        </Grid>
    </>
);

Video.propTypes = {
    id: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    updateGraphic: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    refreshFiles: PropTypes.func.isRequired,
    project: PropTypes.string.isRequired,
};

export default Video;
