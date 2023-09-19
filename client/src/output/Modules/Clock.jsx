import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

let clockInterval;

const Clock = ({ text }) => {
    const [clock, setClock] = useState('00:00');

    useEffect(() => {
        clockInterval = setInterval(() => {
            setClock(() => {
                const now = new Date();
                return `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`;
            });
        }, 5000);
        return () => {
            clearInterval(clockInterval);
        };
    }, []);

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
            {clock}
        </div>
    );
};

Clock.propTypes = {
    text: PropTypes.object.isRequired,
};

export default Clock;
