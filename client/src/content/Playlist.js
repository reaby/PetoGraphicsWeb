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
import UploadButton from '../common/UploadButton';
import isVideo from '../common/functions/isVideo';
import getVideoDuration from '../common/functions/getVideoDuration';

const getPlaylistDuration = (sources, project) => {
    return new Promise((resolve, reject) => {
        Promise.all(sources.map((source) => getVideoDuration(`/configs/${project}/${source}`)))
            .then((durations) => {
                resolve(durations.reduce((partial_sum, a) => partial_sum + a, 0));
            })
            .catch(reject);
    });
};

const Playlist = ({ id, playlist, updateGraphic, files, refreshFiles, project }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <>
            <Grid item xs={12}>
                <List sx={{ height: 200, border: '1px rgba(255, 255, 255, 0.23) solid', borderRadius: 1, mb: 1, overflowY: 'scroll' }} disablePadding>
                    {playlist.sources.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <Tooltip title='Remove'>
                                    <IconButton onClick={() => {
                                        const clone = [...playlist.sources];
                                        clone.splice(index, 1);
                                        updateGraphic(id, 'playlist.sources', clone);
                                        getPlaylistDuration(clone, project)
                                            .then((duration) => {
                                                updateGraphic(id, 'playlist.duration', duration);
                                            })
                                            .catch(console.error);
                                    }}>
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                        <FormControlLabel control={
                            <Checkbox
                                checked={playlist.loop ?? false}
                                onChange={(event) => updateGraphic(id, 'playlist.loop', event.target.checked)}
                            />
                        } label='Loop' />
                        <FormControlLabel control={
                            <Checkbox
                                checked={playlist.hideOnEnd ?? false}
                                onChange={(event) => updateGraphic(id, 'playlist.hideOnEnd', event.target.checked)}
                            />
                        } label='Hide on End' sx={{ ml: 2 }} />
                    </Box>
                    <div>
                        <Tooltip title='Add Video'>
                            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <UploadButton identifier='upload-playlist-video' accept='video/*' onUpload={(values) => {
                            const newSources = [...playlist.sources, ...Array.from(values).map((item) => item.name)];
                            updateGraphic(id, 'playlist.sources', newSources);
                            refreshFiles();
                            getPlaylistDuration(newSources, project)
                                .then((duration) => {
                                    updateGraphic(id, 'playlist.duration', duration);
                                })
                                .catch(console.error);
                        }} />
                    </div>
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
                            <MenuItem key={item} onClick={() => {
                                const newSources = [...playlist.sources, item];
                                updateGraphic(id, 'playlist.sources', newSources);
                                getPlaylistDuration(newSources, project)
                                    .then((duration) => {
                                        updateGraphic(id, 'playlist.duration', duration);
                                    })
                                    .catch(console.error);
                            }}>
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
    playlist: PropTypes.object.isRequired,
    updateGraphic: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    refreshFiles: PropTypes.func.isRequired,
    project: PropTypes.string.isRequired,
};

export default Playlist;
