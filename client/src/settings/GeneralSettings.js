import { memo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import UploadButton from '../common/UploadButton';
import Collapse from '../common/Collapse';
import useFetch from '../common/hooks/useFetch';

const isImage = (file) => {
    const extensions = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
    for (const extension of extensions) {
        if (file.endsWith(`.${extension}`)) {
            return true;
        }
    }
    return false;
};

const GeneralSettings = memo(({ id, name, image, imageStretch, left, top, width, height, updateGraphic, collapsed, setCollapsed }) => {
    const [{ data: files, refresh: refreshFiles }] = useFetch('/api/files');
    return (
        <Collapse title='General Settings' collapsed={collapsed} setCollapsed={setCollapsed}>
            <Grid item xs={12}>
                <TextField
                    label='Name'
                    type='text'
                    value={name ?? ''}
                    onChange={(event) => updateGraphic(id, 'name', event.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    label='Image'
                    type='text'
                    value={image ?? ''}
                    onChange={(event) => updateGraphic(id, 'image', event.target.value)}
                    fullWidth
                    select
                >
                    {files?.filter(isImage).map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>
                <Tooltip title='Clear'>
                    <IconButton component='span' onClick={() => updateGraphic(id, 'image', null)} sx={{ mr: 1, ml: 1 }}>
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
                <UploadButton identifier='upload-image' accept='image/*' onUpload={(value) => {
                    updateGraphic(id, 'image', value);
                    refreshFiles();
                }} />
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
        </Collapse>
    );

});

export default GeneralSettings;
