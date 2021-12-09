import { useEffect, useRef } from 'react';

const Video = ({ graphic, project }) => {
    const videoRef = useRef();

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
