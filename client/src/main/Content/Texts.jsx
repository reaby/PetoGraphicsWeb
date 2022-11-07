import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const useTextsState = (id) => useProject((state) => findGraphic(state.config, id).texts);

const Texts = ({ id }) => {
    const texts = useTextsState(id);
    const updateGraphic = useProject((state) => state.updateGraphic);
    return (
        <>
            {texts.map((text, index) => (
                <Grid
                    key={index}
                    item
                    xs={12}
                >
                    <TextField
                        label={`Text ${index + 1}`}
                        type='text'
                        value={text.content ?? ''}
                        onChange={(event) =>
                            updateGraphic(id, `texts[${index}].content`, event.target.value)
                        }
                        fullWidth
                        multiline={text.rich}
                        minRows={4}
                    />
                </Grid>
            ))}
        </>
    );
};

Texts.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Texts;
