import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import UploadButton from 'common/components/UploadButton';
import isVideo from 'common/utils/isVideo';
import getVideoDuration from 'common/utils/getVideoDuration';
import useFiles from 'common/hooks/useFiles';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';
import getBackendUrl from 'common/utils/getBackendUrl';
const useVideoState = (id) => useProject((state) => findGraphic(state.config, id).video);

const Video = ({ id }) => {
    const video = useVideoState(id);
    const updateGraphic = useProject((state) => state.updateGraphic);
    const name = useProject((state) => state.name);
    const { files } = useFiles();
    return (
        <>
            <Grid
                item
                xs={12}
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <TextField
                    label='Source'
                    type='text'
                    value={video.source ?? ''}
                    onChange={async (event) => {
                        updateGraphic(id, 'video.source', event.target.value);
                        const duration = await getVideoDuration(
                            `${getBackendUrl}/configs/${name}/${event.target.value}`
                        );
                        updateGraphic(id, 'video.duration', duration);
                    }}
                    fullWidth
                    select
                    sx={{ mr: 1 }}
                >
                    {files?.filter(isVideo).map((item) => (
                        <MenuItem
                            key={item}
                            value={item}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </TextField>
                <UploadButton
                    accept='video/*'
                    onUpload={async (value) => {
                        updateGraphic(id, 'video.source', value[0]?.name);
                        const duration = await getVideoDuration(
                            `${getBackendUrl()}/configs/${name}/${value[0]?.name}`
                        );
                        updateGraphic(id, 'video.duration', duration);
                    }}
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={video.loop ?? false}
                            onChange={(event) =>
                                updateGraphic(id, 'video.loop', event.target.checked)
                            }
                        />
                    }
                    label='Loop'
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={video.hideOnEnd ?? false}
                            onChange={(event) =>
                                updateGraphic(id, 'video.hideOnEnd', event.target.checked)
                            }
                        />
                    }
                    label='Hide on End'
                />
            </Grid>
        </>
    );
};

Video.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Video;
