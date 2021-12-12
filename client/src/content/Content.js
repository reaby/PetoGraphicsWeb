import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Collapse from '../common/Collapse';
import Texts from './Texts';
import Video from './Video';
import Countdown from './Countdown';
import Playlist from './Playlist';
import Slider from './Slider';

const Content = memo(({ graphic, updateGraphic, project, files, refreshFiles }) => {
    const [collapsed, setCollapsed] = useState(false);
    let content;
    switch (graphic.type) {
        case 'IMAGE':
        case 'CLOCK':
            return null;

        case 'VIDEO':
            content = <Video id={graphic.id} video={graphic.video} updateGraphic={updateGraphic} files={files} refreshFiles={refreshFiles} project={project} />;
            break;

        case 'COUNTDOWN':
            content = <Countdown id={graphic.id} countdown={graphic.countdown} updateGraphic={updateGraphic} />;
            break;

        case 'PLAYLIST':
            content = <Playlist id={graphic.id} playlist={graphic.playlist} updateGraphic={updateGraphic} files={files} refreshFiles={refreshFiles} project={project} />;
            break;

        case 'SLIDER':
            content = <Slider id={graphic.id} slider={graphic.slider} updateGraphic={updateGraphic} files={files} refreshFiles={refreshFiles} project={project} />;
            break;

        default:
            content = <Texts id={graphic.id} texts={graphic.texts} updateGraphic={updateGraphic} />;
            break;
    }
    return (
        <Collapse title='Content' collapsed={collapsed} setCollapsed={setCollapsed}>
            {content}
        </Collapse>
    );
});

Content.propTypes = {
    graphic: PropTypes.object.isRequired,
    project: PropTypes.string.isRequired,
    updateGraphic: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    refreshFiles: PropTypes.func.isRequired,
};

export default Content;
