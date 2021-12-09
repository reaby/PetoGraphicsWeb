import { useEffect, useState, useRef } from 'react';

const Playlist = ({ graphic, project }) => {
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
        if (graphic.visible) {
            playlistRef.current?.play().catch(console.error);
        }
    }, [currentVideo, graphic.visible]);

    return (
        <video ref={playlistRef} src={`/configs/${project}/${graphic.playlist.sources[currentVideo]}`} style={{ width: '100%', height: '100%', background: 'black' }} />
    );
};

export default Playlist;
