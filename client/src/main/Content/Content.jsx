import { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'common/components/Collapse';
import Texts from './Texts';
import Video from './Video';
import Countdown from './Countdown';
import Playlist from './Playlist';
import Slider from './Slider';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const Content = ({ id }) => {
    const type = useProject((state) => findGraphic(state.config, id).type);
    const [collapsed, setCollapsed] = useState(false);
    let content;
    switch (type) {
        case 'IMAGE':
        case 'CLOCK':
            return null;

        case 'VIDEO':
            content = <Video id={id} />;
            break;

        case 'COUNTDOWN':
            content = <Countdown id={id} />;
            break;

        case 'PLAYLIST':
            content = <Playlist id={id} />;
            break;

        case 'SLIDER':
            content = <Slider id={id} />;
            break;

        default:
            content = <Texts id={id} />;
            break;
    }
    return (
        <Collapse
            title='Content'
            collapsed={collapsed}
            setCollapsed={setCollapsed}
        >
            {content}
        </Collapse>
    );
};

Content.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Content;
