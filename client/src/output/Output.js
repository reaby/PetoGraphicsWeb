import { useState, useEffect } from 'react';
import { Global, css } from '@emotion/react';
import useFetch from '../common/hooks/useFetch';
import Graphic from './Graphic';

let socket;
let clockInterval;

const getFontVariant = (text) => {
    if (text.fontStyle === 'italic' && text.fontWeight === 'bold') {
        return 'Bold Italic';
    } else if (text.fontStyle === 'italic') {
        return 'Italic';
    } else if (text.fontWeight === 'bold') {
        return 'Bold';
    } else {
        return 'Regular';
    }
};

const getConfigFonts = (config, fonts) => {
    let fontMap = new Map();
    for (const graphic of config) {
        for (const text of graphic.texts) {
            const variant = getFontVariant(text);
            if (!fontMap.has(`${text.fontFamily}*${getFontVariant(text)}`)) {
                const filepath = fonts.find((font) => font.family === text.fontFamily && font.files[variant] != null)?.files[variant]
                    .replace('C:\\', '')
                    .replace(/\\/g, '/');
                if (filepath) {
                    fontMap.set(`${text.fontFamily}*${getFontVariant(text)}`, {
                        family: text.fontFamily,
                        variant: variant,
                        style: text.fontStyle,
                        weight: text.fontWeight,
                        filepath: filepath
                    });
                }
            }
        }
        fontMap = new Map([...fontMap, ...getConfigFonts(graphic.children, fonts)]);
    }
    return fontMap;
};

const loadFonts = (config, fonts) => {
    const configFonts = Array.from(getConfigFonts(config, fonts), ([name, value]) => value);
    for (const font of configFonts) {
        const fontFace = new FontFace(font.family, `url(/static/${(escape(font.filepath))})`, {
            style: font.style,
            weight: font.weight
        });
        document.fonts.add(fontFace);
        fontFace.load().catch(console.error);
    }
};

const Preview = () => {
    const [config, setConfig] = useState(null);
    const [clock, setClock] = useState('00:00');
    const [project, setProject] = useState(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [{ data: fonts }] = useFetch('/api/fonts');

    useEffect(() => {
        socket = new WebSocket(process.env.NODE_ENV === 'production' ? window.location.href.replace('http', 'ws') : 'ws://localhost:5000');
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

    useEffect(() => {
        clockInterval = setInterval(() => {
            setClock(() => {
                const now = new Date();
                return `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`;
            });
        }, 5000);
        return () => {
            clearInterval(clockInterval);
        };
    }, []);

    useEffect(() => {
        if (!fontsLoaded && config && fonts) {
            loadFonts(config, fonts);
            setFontsLoaded(true);
        }
    }, [fonts, config, fontsLoaded]);

    if (!config || !fontsLoaded) return null;

    return (
        <>
            <Global
                styles={css`
                    body {
                        width: 100vw;
                        height: 100vh;
                        overflow: hidden;
                    }
                `}
            />
            {config.map((graphic, graphicIndex) => (
                <Graphic
                    key={graphic.id}
                    graphic={graphic}
                    graphicIndex={graphicIndex}
                    project={project}
                    clock={clock}
                />
            ))}
        </>
    );
};

export default Preview;
