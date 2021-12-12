import { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const TextProperties = memo(({
    id, selectedTextIndex, fonts, updateGraphic,
    left, top, width, lineHeight, textAlign, fontFamily, fontSize, fontColor, fontWeight, fontStyle, rich
}) => (
    <>
        <Grid item xs={12} sm={6}>
            <TextField
                label='Position X'
                type='number'
                value={left ?? 0}
                onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].left`, Number(event.target.value))}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label='Position Y'
                type='number'
                value={top ?? 0}
                onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].top`, Number(event.target.value))}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label='Width'
                type='number'
                value={width ?? 0}
                onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].width`, Number(event.target.value))}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label='Line Height'
                type='number'
                value={lineHeight ?? 0}
                onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].lineHeight`, Number(event.target.value))}
                fullWidth
            />
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <FormLabel sx={{ mr: 3 }}>Text Align</FormLabel>
                <RadioGroup
                    row
                    value={textAlign ?? ''}
                    onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].textAlign`, event.target.value)}
                >
                    <FormControlLabel value='left' control={<Radio />} label='Left' />
                    <FormControlLabel value='center' control={<Radio />} label='Center' />
                    <FormControlLabel value='right' control={<Radio />} label='Right' />
                </RadioGroup>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label='Font Family'
                type='text'
                value={fontFamily ?? ''}
                onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].fontFamily`, event.target.value)}
                fullWidth
                select
            >
                {fonts?.map((font) => (
                    <MenuItem key={font.family} value={font.family}>{font.family}</MenuItem>
                ))}
            </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label='Font Color'
                type='color'
                value={fontColor ?? ''}
                onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].fontColor`, event.target.value)}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label='Font Size'
                type='number'
                value={fontSize ?? ''}
                onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].fontSize`, Number(event.target.value))}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <FormControlLabel control={
                <Checkbox
                    checked={rich}
                    onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].rich`, event.target.checked)}
                />
            } label='Rich' />
            <FormControlLabel control={
                <Checkbox
                    checked={fontWeight === 'bold'}
                    onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].fontWeight`, event.target.checked ? 'bold' : 'normal')}
                />
            } label='Bold' />
            <FormControlLabel control={
                <Checkbox
                    checked={fontStyle === 'italic'}
                    onChange={(event) => updateGraphic(id, `texts[${selectedTextIndex}].fontStyle`, event.target.checked ? 'italic' : 'normal')}
                />
            } label='Italic' />
        </Grid>
    </>
));

TextProperties.propTypes = {
    id: PropTypes.string.isRequired,
    selectedTextIndex: PropTypes.number.isRequired,
    fonts: PropTypes.array.isRequired,
    updateGraphic: PropTypes.func.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    textAlign: PropTypes.string.isRequired,
    fontFamily: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontColor: PropTypes.string.isRequired,
    fontWeight: PropTypes.string.isRequired,
    fontStyle: PropTypes.string.isRequired,
    rich: PropTypes.bool.isRequired
};

export default TextProperties;
