import { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Collapse from 'common/components/Collapse';
import TextProperties from './TextProperties';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const TextSettings = ({ id, collapsed, setCollapsed }) => {
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);
    const texts = useProject((state) => findGraphic(state.config, id).texts ?? []);
    const updateGraphic = useProject((state) => state.updateGraphic);
    return (
        <Collapse
            title='Text Settings'
            collapsed={collapsed}
            setCollapsed={setCollapsed}
        >
            <Grid
                item
                xs={12}
            >
                <TextField
                    label='Text'
                    value={selectedTextIndex}
                    onChange={(event) => setSelectedTextIndex(event.target.value)}
                    fullWidth
                    select
                >
                    {texts.map((_, index) => (
                        <MenuItem
                            key={index}
                            value={index}
                        >
                            Text {index + 1}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            {texts[selectedTextIndex] && (
                <Suspense>
                    <TextProperties
                        id={id}
                        selectedTextIndex={selectedTextIndex}
                        updateGraphic={updateGraphic}
                        {...texts[selectedTextIndex]}
                    />
                </Suspense>
            )}
        </Collapse>
    );
};

TextSettings.propTypes = {
    id: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};

export default TextSettings;
