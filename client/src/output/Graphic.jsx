/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Video from './Modules/Video';
import Playlist from './Modules/Playlist';
import Slider from './Modules/Slider';
import Text from './Modules/Text';
import getBackendUrl from 'common/utils/getBackendUrl';
import Clock from './Modules/Clock';

import {
    FadeIn,
    SlideTopIn,
    SlideLeftIn,
    SlideRightIn,
    SlideBottomIn,
    WipeLeftIn,
    WipeTopIn,
    ExpandYIn,
    ExpandXIn,
    FadeOut,
    SlideTopOut,
    SlideLeftOut,
    SlideRightOut,
    SlideBottomOut,
    WipeLeftOut,
    WipeTopOut,
    ExpandYOut,
    ExpandXOut,
} from './Animations';

const animationMap = {
    FadeIn,
    FadeOut,
    SlideTopIn,
    SlideTopOut,
    SlideBottomIn,
    SlideBottomOut,
    SlideLeftIn,
    SlideLeftOut,
    SlideRightIn,
    SlideRightOut,
    WipeLeftIn,
    WipeLeftOut,
    WipeTopIn,
    WipeTopOut,
    ExpandYIn,
    ExpandYOut,
    ExpandXIn,
    ExpandXOut,
};

const computeAnimation = (graphic, isIn) => {
    const animation = isIn ? graphic.animationIn : graphic.animationOut;
    if (animation.style === 'None') {
        return css``;
    }
    return css`
        animation-name: ${animationMap[`${animation.style}${isIn ? 'In' : 'Out'}`](graphic)}${animation.addFade ? css`, ${isIn ? FadeIn(graphic) : FadeOut(graphic)}` : ''};
        animation-duration: ${animation.duration / 1000}s;
        animation-timing-function: ${animation.ease ? 'ease' : 'linear'};
        animation-delay: ${animation.delay / 1000}s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: both;
        animation-play-state: running;
    `;
};

const Graphic = ({ graphic, graphicIndex, project, updateGraphic }) => {
    return (
        <Box
            className='graphic'
            sx={{
                zIndex: graphicIndex + 1,
                position: 'absolute',
                left: graphic.left,
                top: graphic.top,
                width: graphic.width,
                height: graphic.height,
                backgroundImage: graphic.image
                    ? `url(${getBackendUrl()}/configs/${project}/${graphic.image})`
                    : `none`,
                backgroundSize: graphic.imageStretch === 'fit' ? 'contain' : '100% 100%',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                overflow: 'hidden',
            }}
            css={computeAnimation(graphic, graphic.visible)}
        >
            {graphic.type === 'VIDEO' && graphic.video?.source && (
                <Video
                    graphic={graphic}
                    project={project}
                    updateGraphic={updateGraphic}
                />
            )}
            {graphic.type === 'PLAYLIST' && (
                <Playlist
                    graphic={graphic}
                    project={project}
                    updateGraphic={updateGraphic}
                />
            )}
            {graphic.type === 'SLIDER' && (
                <Slider
                    graphic={graphic}
                    project={project}
                />
            )}
            {graphic.type === 'CLOCK' && <Clock text={graphic.texts[0]} />}
            {(graphic.type.endsWith('TEXT') || graphic.type === 'COUNTDOWN') &&
                graphic.texts.map((text, index) => (
                    <Text
                        key={index}
                        text={text}
                    />
                ))}
            {graphic.children.map((child) => (
                <Graphic
                    key={child.id}
                    graphic={child}
                    graphicIndex={graphicIndex}
                    project={project}
                    updateGraphic={updateGraphic}
                />
            ))}
        </Box>
    );
};

Graphic.propTypes = {
    graphic: PropTypes.object.isRequired,
    graphicIndex: PropTypes.number.isRequired,
    project: PropTypes.string,
    updateGraphic: PropTypes.func.isRequired,
};

export default Graphic;
