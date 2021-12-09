/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Video from './Video';
import Playlist from './Playlist';
import Slider from './Slider';
import {
    FadeIn, SlideTopIn, SlideLeftIn, SlideRightIn, SlideBottomIn, WipeLeftIn, WipeTopIn, ExpandYIn, ExpandXIn,
    FadeOut, SlideTopOut, SlideLeftOut, SlideRightOut, SlideBottomOut, WipeLeftOut, WipeTopOut, ExpandYOut, ExpandXOut
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
    ExpandXOut
};

const computeAnimation = (graphic, isIn) => {
    const animation = isIn ? graphic.animationIn : graphic.animationOut;
    return css`
        animation-name: ${animationMap[`${animation.style}${isIn ? 'In' : 'Out'}`](graphic)}${animation.addFade ? css`, ${isIn ? FadeIn(graphic) : FadeOut(graphic)}` : ''};
        animation-duration: ${animation.duration / 1000}s;
        animation-timing-function: ${animation.ease ? 'ease' : 'linear'};
        animation-delay: ${animation.delay / 1000}s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-play-state: running;
    `;
};

const Graphic = ({ graphic, graphicIndex, project, clock }) => {
    return (
        <div
            style={{
                zIndex: graphicIndex + 1,
                position: 'absolute',
                left: graphic.left,
                top: graphic.top,
                width: graphic.width,
                height: graphic.height,
                backgroundImage: graphic.image && `url(/configs/${project}/${graphic.image})`,
                backgroundSize: graphic.imageStretch === 'fit' ? 'contain' : '100% 100%',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                overflow: 'hidden'
            }} css={computeAnimation(graphic, graphic.visible)}
        >
            {graphic.video?.source && <Video graphic={graphic} project={project} />}
            {graphic.playlist && <Playlist graphic={graphic} project={project} />}
            {graphic.slider && <Slider graphic={graphic} project={project} />}
            {graphic.texts.map((text, index) => (
                <div
                    key={index}
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
                        textAlign: text.textAlign
                    }}
                >
                    {graphic.type === 'CLOCK' ? clock : text.content}
                </div>
            ))}
            {graphic.children.map((child) => (
                <Graphic key={child.id} graphic={child} graphicIndex={graphicIndex} project={project} />
            ))}
        </div>
    );
};


Graphic.propTypes = {
    graphic: PropTypes.object.isRequired,
    graphicIndex: PropTypes.number.isRequired,
    project: PropTypes.string,
    clock: PropTypes.string
};

export default Graphic;
