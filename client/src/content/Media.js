import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import UploadButton from '../common/UploadButton';

const Media = ({ id, media, updateGraphic }) => (
    <>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label='Source'
                type='text'
                value={media.source ?? ''}
                onChange={(event) => updateGraphic(id, 'media.source', event.target.value)}
                fullWidth
                sx={{ mr: 1 }}
            />
            <UploadButton identifier='upload-media' accept='video/*,audio/*' onUpload={(value) => updateGraphic(id, 'media.source', value)} />
        </Grid>
        <Grid item xs={12}>
            <FormControlLabel control={
                <Checkbox
                    checked={media.loop}
                    onChange={(event) => updateGraphic(id, 'media.loop', event.target.checked)}
                />
            } label='Loop' />
        </Grid>
    </>
);

export default Media;
