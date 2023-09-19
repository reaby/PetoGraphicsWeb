import PropTypes from 'prop-types';

const Text = ({ text }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: text.left,
                top: text.top,
                width: text.width,
                whiteSpace: text.rich ? 'pre-line' : 'nowrap',
                fontFamily: text.fontFamily,
                fontSize: text.fontSize,
                fontWeight: text.fontWeight,
                fontStyle: text.fontStyle,
                color: text.fontColor,
                lineHeight: text.lineHeight + 'px',
                textAlign: text.textAlign,
                textShadow: text.outline
                    ? `-1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 1px  1px 0 #000, 0 1px 0 #000, -1px  1px 0 #000, -1px 0 0 #000`
                    : `none`,
            }}
        >
            {text.content}
        </div>
    );
};

Text.propTypes = {
    text: PropTypes.object.isRequired,
};

export default Text;
