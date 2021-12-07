/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
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
    const videoRef = useRef();
    const playlistRef = useRef();
    const [currentVideo, setCurrentVideo] = useState(0);

    // Video
    useEffect(() => {
        if (videoRef.current) {
            if (graphic.visible) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(console.error);
            } else {
                videoRef.current.pause();
            }
        }
    }, [graphic.visible, graphic]);

    // Playlist
    useEffect(() => {
        if (playlistRef.current) {
            if (graphic.visible) {
                setCurrentVideo(0);
                playlistRef.current.currentTime = 0;
                playlistRef.current.play().catch(console.error);
            } else {
                playlistRef.current.pause();
            }
        }
    }, [graphic.visible, graphic]);

    // Playlist handler
    useEffect(() => {
        const playlist = playlistRef.current;
        const nextVideo = () => {
            setCurrentVideo((prev) => {
                if (prev < graphic.playlist.length - 1) {
                    return prev + 1;
                } else {
                    return graphic.playlist.loop ? 0 : prev;
                }
            });
        };
        if (graphic.type === 'PLAYLIST' && playlistRef.current) {
            playlist.addEventListener('ended', nextVideo);
        }
        return () => {
            playlist?.removeEventListener('ended', nextVideo);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        playlistRef.current?.play().catch(console.error);
    }, [currentVideo]);

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
            {graphic.video?.source && <video ref={videoRef} src={`/configs/${project}/${graphic.video.source}`} loop={graphic.video.loop} style={{ width: '100%', height: '100%' }} />}
            {graphic.playlist && <video ref={playlistRef} src={`/configs/${project}/${graphic.playlist.sources[currentVideo]}`} style={{ width: '100%', height: '100%', background: 'black' }} />}
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
