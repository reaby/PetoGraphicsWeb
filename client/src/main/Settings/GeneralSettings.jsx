import { useState } from 'react';
import PropTypes from 'prop-types';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import ClearIcon from '@mui/icons-material/Clear';
import UploadButton from 'common/components/UploadButton';
import Collapse from 'common/components/Collapse';
import isImage from 'common/utils/isImage';
import getImageSizes from 'common/utils/getImageSizes';
import useFiles from 'common/hooks/useFiles';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';
import shallow from 'zustand/shallow';

const useGeneralSettingsState = (id) =>
    useProject((state) => {
        const target = findGraphic(state.config, id);
        return {
            name: target.name,
            image: target.image,
            imageStretch: target.imageStretch,
            width: target.width,
            height: target.height,
            left: target.left,
            top: target.top,
        };
    }, shallow);

const GeneralSettings = ({ id, collapsed, setCollapsed }) => {
    const { name, image, imageStretch, width, height, left, top } = useGeneralSettingsState(id);
    const projectName = useProject((state) => state.name);
    const updateGraphic = useProject((state) => state.updateGraphic);
    const { files } = useFiles();
    const [matchDialogOpen, setMatchDialogOpen] = useState(false);
    return (
        <Collapse
            title='General Settings'
            collapsed={collapsed}
            setCollapsed={setCollapsed}
        >
            <Grid
                item
                xs={12}
            >
                <TextField
                    label='Name'
                    type='text'
                    value={name ?? ''}
                    onChange={(event) => updateGraphic(id, 'name', event.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <TextField
                    label='Image'
                    type='text'
                    value={image ?? ''}
                    onChange={(event) => {
                        updateGraphic(id, 'image', event.target.value);
                        setMatchDialogOpen(true);
                    }}
                    fullWidth
                    select
                >
                    {files?.filter(isImage).map((item) => (
                        <MenuItem
                            key={item}
                            value={item}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </TextField>
                <Tooltip title='Clear'>
                    <IconButton
                        component='span'
                        onClick={() => updateGraphic(id, 'image', null)}
                        sx={{ mr: 1, ml: 1 }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
                <UploadButton
                    accept='image/*'
                    onUpload={(value) => {
                        updateGraphic(id, 'image', value[0]?.name);
                        setMatchDialogOpen(true);
                    }}
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <FormControl
                    fullWidth
                    sx={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <FormLabel sx={{ mr: 3 }}>Image Stretch</FormLabel>
                    <RadioGroup
                        row
                        value={imageStretch ?? ''}
                        onChange={(event) => updateGraphic(id, 'imageStretch', event.target.value)}
                    >
                        <FormControlLabel
                            value='fill'
                            control={<Radio />}
                            label='Fill'
                        />
                        <FormControlLabel
                            value='fit'
                            control={<Radio />}
                            label='Fit'
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
            >
                <TextField
                    label='Position X'
                    type='number'
                    value={left ?? 0}
                    onChange={(event) => updateGraphic(id, 'left', Number(event.target.value))}
                    fullWidth
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
            >
                <TextField
                    label='Position Y'
                    type='number'
                    value={top ?? 0}
                    onChange={(event) => updateGraphic(id, 'top', Number(event.target.value))}
                    fullWidth
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
            >
                <TextField
                    label='Width'
                    type='number'
                    value={width ?? 0}
                    onChange={(event) => updateGraphic(id, 'width', Number(event.target.value))}
                    fullWidth
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
            >
                <TextField
                    label='Height'
                    type='number'
                    value={height ?? 0}
                    onChange={(event) => updateGraphic(id, 'height', Number(event.target.value))}
                    fullWidth
                />
            </Grid>
            <Dialog
                fullWidth
                open={matchDialogOpen}
                onClose={() => setMatchDialogOpen(false)}
            >
                <DialogTitle>Match image dimensions</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to change graphic size to match image dimensions?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color='primary'
                        onClick={() => setMatchDialogOpen(false)}
                    >
                        Close
                    </Button>
                    <Button
                        color='primary'
                        onClick={async () => {
                            setMatchDialogOpen(false);
                            const { width, height } = await getImageSizes(
                                `/configs/${projectName}/${image}`
                            );
                            updateGraphic(id, 'width', Number(width));
                            updateGraphic(id, 'height', Number(height));
                        }}
                    >
                        Change
                    </Button>
                </DialogActions>
            </Dialog>
        </Collapse>
    );
};

GeneralSettings.propTypes = {
    id: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};

export default GeneralSettings;
