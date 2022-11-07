import { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import UploadButton from 'common/components/UploadButton';
import isVideo from 'common/utils/isVideo';
import getVideoDuration from 'common/utils/getVideoDuration';
import useFiles from 'common/hooks/useFiles';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const getPlaylistDuration = (sources, project) => {
    return new Promise((resolve, reject) => {
        Promise.all(sources.map((source) => getVideoDuration(`/configs/${project}/${source}`)))
            .then((durations) => resolve(durations))
            .catch(() => reject());
    });
};

const usePlaylistState = (id) => useProject((state) => findGraphic(state.config, id).playlist);

const Playlist = ({ id }) => {
    const playlist = usePlaylistState(id);
    const name = useProject((state) => state.name);
    const updateGraphic = useProject((state) => state.updateGraphic);
    const { files } = useFiles();
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <>
            <Grid
                item
                xs={12}
            >
                <List
                    sx={{
                        height: 200,
                        border: '1px rgba(255, 255, 255, 0.23) solid',
                        borderRadius: 1,
                        mb: 1,
                        overflowY: 'scroll',
                    }}
                    disablePadding
                >
                    {playlist.sources.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <Tooltip title='Remove'>
                                    <IconButton
                                        onClick={async () => {
                                            const clone = [...playlist.sources];
                                            clone.splice(index, 1);
                                            updateGraphic(id, 'playlist.sources', clone);
                                            const durations = await getPlaylistDuration(
                                                clone,
                                                name
                                            );
                                            updateGraphic(id, 'playlist.durations', durations);
                                        }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={playlist.loop ?? false}
                                    onChange={(event) =>
                                        updateGraphic(id, 'playlist.loop', event.target.checked)
                                    }
                                />
                            }
                            label='Loop'
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={playlist.hideOnEnd ?? false}
                                    onChange={(event) =>
                                        updateGraphic(
                                            id,
                                            'playlist.hideOnEnd',
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            label='Hide on End'
                            sx={{ ml: 2 }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Tooltip title='Add Video'>
                            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <UploadButton
                            accept='video/*'
                            onUpload={async (values) => {
                                const newSources = [
                                    ...playlist.sources,
                                    ...Array.from(values).map((item) => item.name),
                                ];
                                updateGraphic(id, 'playlist.sources', newSources);
                                const durations = await getPlaylistDuration(newSources, name);
                                updateGraphic(id, 'playlist.duration', durations);
                            }}
                        />
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {files.filter(isVideo).map((item) => (
                            <MenuItem
                                key={item}
                                onClick={async () => {
                                    const newSources = [...playlist.sources, item];
                                    updateGraphic(id, 'playlist.sources', newSources);
                                    const durations = await getPlaylistDuration(newSources, name);
                                    updateGraphic(id, 'playlist.durations', durations);
                                }}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Grid>
        </>
    );
};

Playlist.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Playlist;
