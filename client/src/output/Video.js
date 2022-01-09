import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Video = ({ graphic, project, updateGraphic }) => {
    const videoRef = useRef();

    useEffect(() => {
        const video = videoRef.current;
        const hideOnEnd = () => {
            if (graphic.video.hideOnEnd) {
                updateGraphic(graphic.id, 'visible', false, true);
            }
        };
        video.addEventListener('ended', hideOnEnd);
        return () => video?.removeEventListener('ended', hideOnEnd);
    }, [graphic.id, graphic.video.hideOnEnd, updateGraphic]);

    useEffect(() => {
        let updateInterval;
        if (graphic.visible) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(console.error);
            updateGraphic(graphic.id, 'video.currentTime', 0);
            updateInterval = setInterval(() => {
                updateGraphic(graphic.id, 'video.currentTime', videoRef.current.currentTime);
            }, 1000);
        } else {
            videoRef.current.pause();
            updateGraphic(graphic.id, 'video.currentTime', 0);
        }
        return () => clearInterval(updateInterval);
    }, [graphic.id, graphic.visible, updateGraphic]);

    return (
        <video ref={videoRef} src={`/configs/${project}/${graphic.video.source}`} loop={graphic.video.loop} style={{ width: '100%', height: '100%' }} />
    );
};

Video.propTypes = {
    graphic: PropTypes.object.isRequired,
    project: PropTypes.string.isRequired,
    updateGraphic: PropTypes.func.isRequired
};

export default Video;
