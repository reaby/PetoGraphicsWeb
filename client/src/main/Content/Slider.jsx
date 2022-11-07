import { useState } from 'react';
import PropTypes from 'prop-types';
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
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import UploadButton from 'common/components/UploadButton';
import isImage from 'common/utils/isImage';
import useFiles from 'common/hooks/useFiles';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const useSliderState = (id) => useProject((state) => findGraphic(state.config, id).slider);

const Slider = ({ id }) => {
    const slider = useSliderState(id);
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
                    {slider.sources.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <Tooltip title='Remove'>
                                    <IconButton
                                        onClick={() => {
                                            const clone = [...slider.sources];
                                            clone.splice(index, 1);
                                            updateGraphic(id, 'slider.sources', clone);
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
                    <div>
                        <Tooltip title='Add Image'>
                            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <UploadButton
                            accept='image/*'
                            onUpload={(values) => {
                                const newSources = [
                                    ...slider.sources,
                                    ...Array.from(values).map((item) => item.name),
                                ];
                                updateGraphic(id, 'slider.sources', newSources);
                            }}
                        />
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
                        {files.filter(isImage).map((item) => (
                            <MenuItem
                                key={item}
                                onClick={() => {
                                    const newSources = [...slider.sources, item];
                                    updateGraphic(id, 'slider.sources', newSources);
                                }}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <TextField
                    label='Duration (s)'
                    type='number'
                    value={slider.duration ?? 10}
                    onChange={(event) => updateGraphic(id, 'slider.duration', event.target.value)}
                    fullWidth
                />
            </Grid>
        </>
    );
};

Slider.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Slider;
