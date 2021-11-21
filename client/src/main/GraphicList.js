import { useState, useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import { BLANK } from './Graphics';
import { Context } from '../Context';

const GraphicList = ({ matches }) => {
    const { config, setConfig, live, selectedGraphic, setSelectedGraphicId, updateGraphic } = useContext(Context);
    const [anchorEl, setAnchorEl] = useState(null);

    const addGraphic = (graphicJSON) => {
        setAnchorEl(null);
        setConfig((prev) => [...prev, graphicJSON()]);
    };

    const hotkeys = (event) => {
        let index;
        switch(event.keyCode) {
            case 38:
                index = config.findIndex((item) => item.id === selectedGraphic?.id);
                if (index > 0) {
                    setSelectedGraphicId(config[index - 1].id);
                }
                break;
            case 40:
                index = config.findIndex((item) => item.id === selectedGraphic?.id);
                if (index < config.length - 1) {
                    setSelectedGraphicId(config[index + 1].id);
                }
                break;
            case 46:
                if (!live) {
                    index = config.findIndex((item) => item.id === selectedGraphic.id);
                    setConfig((prev) => prev.filter((graphic) => graphic.id !== selectedGraphic?.id));
                    setSelectedGraphicId(null);
                }
                break;
            case 113:
                updateGraphic(selectedGraphic.id, 'visible', !selectedGraphic.visible);
                break;
            default:
                break;
        }
    };

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
                    <MenuItem onClick={() => addGraphic(BLANK)}>Blank</MenuItem>
                    <MenuItem onClick={addGraphic}>Single Text</MenuItem>
                    <MenuItem onClick={addGraphic}>Double Text</MenuItem>
                    <MenuItem onClick={addGraphic}>Rick Text</MenuItem>
                    <MenuItem onClick={addGraphic}>Image</MenuItem>
                </Menu>
            </Toolbar>
            <Divider />
            <List sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }} disablePadding onKeyDown={hotkeys}>
                {config?.map((graphic, index) => (
                    <ListItem
                        key={graphic.id}
                        onClick={() => setSelectedGraphicId(graphic.id)}
                        disablePadding
                    >
                        <ListItemButton selected={selectedGraphic?.id === graphic.id}>
                            <ListItemText primary={graphic.name} />
                            <ListItemSecondaryAction>
                                <Button
                                    variant='contained'
                                    color={graphic.visible ? 'primary' : 'secondary'}
                                    onClick={(event) => {
                                        updateGraphic(graphic.id, 'visible', !graphic.visible);
                                        event.stopPropagation();
                                    }}
                                    sx={{ width: 100 }}
                                >
                                    {graphic.visible ? 'Hide' : 'Show'}
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default GraphicList;
