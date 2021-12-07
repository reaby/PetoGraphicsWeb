import { memo } from 'react';
import Collapse from '../common/Collapse';
import Texts from './Texts';
import Video from './Video';
import Countdown from './Countdown';
import Playlist from './Playlist';

const Content = memo(({ graphic, updateGraphic, project, collapsed, setCollapsed, files, refreshFiles }) => {
    let content;
    switch (graphic.type) {
        case 'CLOCK':
            break;

        case 'VIDEO':
            content = <Video id={graphic.id} video={graphic.video} updateGraphic={updateGraphic} files={files} refreshFiles={refreshFiles} project={project} />;
            break;

        case 'COUNTDOWN':
            content = <Countdown id={graphic.id} countdown={graphic.countdown} updateGraphic={updateGraphic} />;
            break;

        case 'PLAYLIST':
            content = <Playlist id={graphic.id} playlist={graphic.playlist} updateGraphic={updateGraphic} files={files} refreshFiles={refreshFiles} project={project} />;
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

export default Content;
