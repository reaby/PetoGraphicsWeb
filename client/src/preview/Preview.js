import { useState, useEffect } from 'react';

let socket;

const Preview = () => {
    const [config, setConfig] = useState(null);
    const [project, setProject] = useState(null);

    useEffect(() => {
        socket = new WebSocket('ws://localhost:5000');
        socket.onmessage = (msg) => {
            const msgData = JSON.parse(msg.data);
            setConfig(msgData.payload.config);
            setProject(msgData.payload.project);
        };
        return () => {
            socket?.close();
        };
        // eslint-disable-next-line
    }, []);

    if (!config) return null;

    return (
        <>
            {config.map((graphic) => (
                <div
                    key={graphic.id}
                    style={{
                        position: 'absolute',
                        left: graphic.left,
                        top: graphic.top,
                        width: graphic.width,
                        height: graphic.height,
                        backgroundImage: graphic.image && `url(${graphic.image})`,
                        backgroundSize: graphic.imageStrech === 'fit' ? 'contain' : 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {graphic.texts?.map((text, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                left: text.left,
                                top: text.top,
                                width: text.width,
                                fontFamily: text.fontFamily,
                                fontSize: text.fontSize,
                                fontWeight: text.fontWeight,
                                fontStyle: text.fontStyle,
                                color: text.fontColor,
                                textAlign: text.textAlign
                            }}
                        >
                            {text.content}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default Preview;
