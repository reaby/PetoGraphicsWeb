import { useEffect, useRef } from 'react';

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
        if (videoRef.current) {
            if (graphic.visible) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(console.error);
            } else {
                videoRef.current.pause();
            }
        }
    }, [graphic.visible]);
    return (
        <video ref={videoRef} src={`/configs/${project}/${graphic.video.source}`} loop={graphic.video.loop} style={{ width: '100%', height: '100%' }} />
    );
};

export default Video;
