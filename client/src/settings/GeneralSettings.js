import { useState, memo } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import fetch from '../common/functions/fetchWrap';
import { showMessage } from '../common/Notifier';

const GeneralSettings = memo(({ id, name, image, imageStretch, left, top, width, height, updateGraphic, collapsed, setCollapsed }) => {
    const [uploading, setUploading] = useState(false);
    console.log('Render GeneralSettings');
    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='subtitle1' sx={{ flex: 1 }}>General Settings</Typography>
                    <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
                    </IconButton>
                </Box>
                <Divider />
            </Grid>
            {!collapsed && (
                <>
                    <Grid item xs={12}>
                        <TextField
                            label='Name'
                            type='text'
                            value={name ?? ''}
                            onChange={(event) => updateGraphic(id, 'name', event.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Image'
                            type='text'
                            value={image ?? ''}
                            fullWidth
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {image && (
                                            <Tooltip title='Clear'>
                                                <IconButton component='span' onClick={() => updateGraphic(id, 'image', null)}>
                                                    <ClearIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title='Upload'>
                                            <label htmlFor='upload-image'>
                                                <input
                                                    id='upload-image'
                                                    accept='image/*'
                                                    type='file'
                                                    style={{ display: 'none' }}
                                                    onChange={(event) => {
                                                        updateGraphic(id, 'image', event.target.files[0].name);
                                                        const data = new FormData();
                                                        data.append('file', event.target.files[0]);
                                                        setUploading(true);
                                                        fetch('/api/upload', {
                                                            method: 'POST',
                                                            body: data
                                                        }).catch((error) => {
                                                            error.then((text) => showMessage(text, true));
                                                        }).finally(() => setUploading(false));
                                                    }}
                                                />
                                                {uploading ? (
                                                    <CircularProgress />
                                                ) : (
                                                    <IconButton component='span'>
                                                        <UploadFileIcon />
                                                    </IconButton>
                                                )}
                                            </label>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FormLabel sx={{ mr: 3 }}>Image Stretch</FormLabel>
                            <RadioGroup
                                row
                                value={imageStretch ?? ''}
                                onChange={(event) => updateGraphic(id, 'imageStretch', event.target.value)}
                            >
                                <FormControlLabel value='fill' control={<Radio />} label='Fill' />
                                <FormControlLabel value='fit' control={<Radio />} label='Fit' />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Position X'
                            type='number'
                            value={left ?? 0}
                            onChange={(event) => updateGraphic(id, 'left', Number(event.target.value))}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Position Y'
                            type='number'
                            value={top ?? 0}
                            onChange={(event) => updateGraphic(id, 'top', Number(event.target.value))}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Width'
                            type='number'
                            value={width ?? 0}
                            onChange={(event) => updateGraphic(id, 'width', Number(event.target.value))}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Height'
                            type='number'
                            value={height ?? 0}
                            onChange={(event) => updateGraphic(id, 'height', Number(event.target.value))}
                            fullWidth
                        />
                    </Grid>
                </>
            )}
        </>
    );

});

export default GeneralSettings;
