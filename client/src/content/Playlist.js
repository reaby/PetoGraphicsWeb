import { useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import UploadButton from '../common/UploadButton';
import isVideo from '../common/functions/isVideo';

const Playlist = ({ id, playlist, updateGraphic, files, refreshFiles }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <Grid item xs={12}>
            <List sx={{ height: 200, border: '1px rgba(255, 255, 255, 0.23) solid', borderRadius: 1, mb: 1, overflowY: 'scroll' }} disablePadding>
                {playlist.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item} />
                        <ListItemSecondaryAction>
                            <Tooltip title='Remove'>
                                <IconButton onClick={() => {
                                    const clone = [...playlist];
                                    clone.splice(index, 1);
                                    updateGraphic(id, 'playlist', clone);
                                }}>
                                    <ClearIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title='Add Video'>
                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <UploadButton identifier='upload-playlist-video' accept='video/*' onUpload={(values) => {
                    updateGraphic(id, 'playlist', [...playlist, values?.map((item) => item.name)]);
                    refreshFiles();
                }} />
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
                        <MenuItem key={item} onClick={() => updateGraphic(id, 'playlist', [...playlist, item])}>{item}</MenuItem>
                    ))}
                </Menu>
            </Box>
        </Grid>
    );
};

export default Playlist;
