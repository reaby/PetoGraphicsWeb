import { memo } from 'react';
import Collapse from '../common/Collapse';
import Texts from './Texts';
import Media from './Media';

const Content = memo(({ id, texts, media, updateGraphic, collapsed, setCollapsed }) => (
    <Collapse title='Content' collapsed={collapsed} setCollapsed={setCollapsed}>
        {texts.length > 0 && <Texts id={id} texts={texts} updateGraphic={updateGraphic} />}
        {media && <Media id={id} media={media} updateGraphic={updateGraphic} />}
    </Collapse>
));

export default Content;
