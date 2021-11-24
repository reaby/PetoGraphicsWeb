import { useState, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextProperties from './TextProperties';

const TextSettings = ({ selectedGraphic, updateGraphic, fonts, collapsed, setCollapsed }) => {
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);
    const selectedText = useMemo(() => selectedGraphic?.texts?.[selectedTextIndex], [selectedGraphic, selectedTextIndex]);
    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setCollapsed((prev) => !prev)}>
                    <Typography variant='subtitle1' sx={{ flex: 1 }}>Text Settings</Typography>
                    <IconButton>
                        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
                    </IconButton>
                </Box>
                <Divider />
            </Grid>
            {!collapsed && (
                <>
                    <Grid item xs={12}>
                        <TextField
                            label='Text'
                            value={selectedTextIndex}
                            onChange={(event) => setSelectedTextIndex(event.target.value)}
                            fullWidth
                            select
                        >
                            {selectedGraphic.texts?.map((text, index) => (
                                <MenuItem key={index} value={index}>
                                    Text {index + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {selectedText && (
                        <TextProperties
                            {...selectedText}
                            id={selectedGraphic.id}
                            selectedTextIndex={selectedTextIndex}
                            updateGraphic={updateGraphic}
                            fonts={fonts}
                        />
                    )}
                </>
            )}
        </>
    );

};

export default TextSettings;
