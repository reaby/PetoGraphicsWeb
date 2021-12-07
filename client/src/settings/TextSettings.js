import { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '../common/Collapse';
import TextProperties from './TextProperties';

const TextSettings = memo(({ id, texts, updateGraphic, fonts, collapsed, setCollapsed }) => {
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);
    const selectedText = useMemo(() => texts[selectedTextIndex], [texts, selectedTextIndex]);
    return (
        <Collapse title='Text Settings' collapsed={collapsed} setCollapsed={setCollapsed}>
            <Grid item xs={12}>
                <TextField
                    label='Text'
                    value={selectedTextIndex}
                    onChange={(event) => setSelectedTextIndex(event.target.value)}
                    fullWidth
                    select
                >
                    {texts.map((text, index) => (
                        <MenuItem key={index} value={index}>
                            Text {index + 1}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            {selectedText && (
                <TextProperties
                    {...selectedText}
                    id={id}
                    selectedTextIndex={selectedTextIndex}
                    updateGraphic={updateGraphic}
                    fonts={fonts}
                />
            )}
        </Collapse>
    );
});

TextSettings.propTypes = {
    id: PropTypes.string.isRequired,
    texts: PropTypes.array.isRequired,
    fonts: PropTypes.array.isRequired,
    collapsed: PropTypes.bool.isRequired,
    setCollapse: PropTypes.func.isRequired
};

export default TextSettings;
