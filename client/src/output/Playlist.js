import { useEffect, useState, useRef } from 'react';

const Playlist = ({ graphic, project, updateGraphic }) => {
    const playlistRef = useRef();
    const [currentVideo, setCurrentVideo] = useState(0);

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
    }, [graphic.visible]);

    useEffect(() => {
        const playlist = playlistRef.current;
        const nextVideo = () => {
            setCurrentVideo((prev) => {
                if (prev < graphic.playlist.sources.length - 1) {
                    return prev + 1;
                }
                if (graphic.playlist.loop) {
                    return 0;
                }
                if (graphic.playlist.hideOnEnd) {
                    setTimeout(() => updateGraphic(graphic.id, 'visible', false, true), 0);
                }
                return prev;
            });
        };
        playlist.addEventListener('ended', nextVideo);
        return () => {
            playlist?.removeEventListener('ended', nextVideo);
        };
    }, [graphic.playlist.loop, graphic.id, graphic.playlist.hideOnEnd, graphic.playlist.sources.length, updateGraphic]);

    useEffect(() => {
        if (graphic.visible) {
            playlistRef.current?.play().catch(console.error);
        }
    }, [currentVideo, graphic.visible]);

    return (
        <video ref={playlistRef} src={`/configs/${project}/${graphic.playlist.sources[currentVideo]}`} style={{ width: '100%', height: '100%', background: 'black' }} />
    );
};

export default Playlist;
