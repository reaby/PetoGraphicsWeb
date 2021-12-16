import { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import { SINGLE_TEXT, DOUBLE_TEXT, TRIPLE_TEXT, IMAGE, VIDEO, CLOCK, COUNTDOWN, PLAYLIST, SLIDER } from './Templates';
import findParentGraphic from '../common/functions/findParentGraphic';
import findGraphic from '../common/functions/findGraphic';
import { Context } from '../Context';
import Controller from './Controller';
import produce from 'immer';

window.addEventListener('keydown', (event) => {
    if (event.keyCode === 17) {
        window.grouping = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode === 17) {
        window.grouping = false;
    }
});

const GraphicList = ({ matches }) => {
    const { config, setConfig, selectedGraphic, setSelectedGraphicId, updateGraphic, countdowns, setCountdowns } = useContext(Context);
    const [anchorEl, setAnchorEl] = useState(null);

    const addGraphic = (graphicJSON) => {
        setAnchorEl(null);
        setConfig((prev) => [...prev, graphicJSON()]);
    };

    const onDragStart = useCallback((event, graphic) => {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('startId', graphic.id);
    }, []);

    const onDragOver = useCallback((event) => event.preventDefault(), []);

    const onDrop = useCallback((event, dropGraphic) => {
        setConfig((prev) => produce(prev, (newConfig) => {
            const endId = dropGraphic.id;
            const endParent = findParentGraphic(newConfig, endId);
            const endIndex = (endParent?.children ?? newConfig).findIndex((item) => item.id === endId);
            const startId = event.dataTransfer.getData('startId');
            const startParent = findParentGraphic(newConfig, startId);
            const startIndex = (startParent?.children ?? newConfig).findIndex((item) => item.id === startId);

            // Same target so do nothing
            if (endId === startId) {
                return;
            }

            // Already in correct position so no changes needed
            if (!window.grouping && startParent?.id === endParent?.id && endIndex === startIndex - 1) {
                return;
            }

            const graphic = findGraphic(newConfig, endId);
            // Remove from old
            const target = (startParent?.children ?? newConfig).splice(startIndex, 1)[0];
            if (!window.grouping) {
                // Place to new parent
                (endParent?.children ?? newConfig).splice(startParent?.id === endParent?.id && startIndex < endIndex ? endIndex : endIndex + 1, 0, target);
            } else {
                // Place as child
                graphic.children.push(target);
            }
        }));
    }, [setConfig]);

    return (
        <>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <Tooltip title='Add Graphic'>
                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                        <Add />
                    </IconButton>
                </Tooltip>
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
                    <MenuItem onClick={() => addGraphic(SINGLE_TEXT)}>Single Text</MenuItem>
                    <MenuItem onClick={() => addGraphic(DOUBLE_TEXT)}>Double Text</MenuItem>
                    <MenuItem onClick={() => addGraphic(TRIPLE_TEXT)}>Triple Text</MenuItem>
                    <MenuItem onClick={() => addGraphic(IMAGE)}>Image</MenuItem>
                    <MenuItem onClick={() => addGraphic(SLIDER)}>Slider</MenuItem>
                    <MenuItem onClick={() => addGraphic(VIDEO)}>Video</MenuItem>
                    <MenuItem onClick={() => addGraphic(PLAYLIST)}>Playlist</MenuItem>
                    <MenuItem onClick={() => addGraphic(CLOCK)}>Clock</MenuItem>
                    <MenuItem onClick={() => addGraphic(COUNTDOWN)}>Countdown</MenuItem>
                </Menu>
            </Toolbar>
            <Divider />
            <List sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }} disablePadding>
                {config?.map((graphic, index) => (
                    <Controller
                        key={graphic.id}
                        graphic={graphic}
                        selectedGraphicId={selectedGraphic?.id}
                        setSelectedGraphicId={setSelectedGraphicId}
                        updateGraphic={updateGraphic}
                        countdowns={countdowns}
                        setCountdowns={setCountdowns}
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                    />
                ))}
            </List>
        </>
    );
};

GraphicList.propTypes = {
    matches: PropTypes.bool.isRequired
};

export default GraphicList;
