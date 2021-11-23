/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import useFetch from '../common/hooks/useFetch';
import {
    FadeIn, SlideTopIn, SlideLeftIn, SlideRightIn, SlideBottomIn, WipeLeftIn, WipeTopIn, ExpandYIn, ExpandXIn,
    FadeOut, SlideTopOut, SlideLeftOut, SlideRightOut, SlideBottomOut, WipeLeftOut, WipeTopOut, ExpandYOut, ExpandXOut
} from './Animations';

let socket;

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
        fontMap = new Map([...fontMap, ...getConfigFonts(graphic.children)]);
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
        animation-name: ${animationMap[`${animation.style}${isIn ? 'In' : 'Out'}`](graphic)};
        animation-duration: ${animation.duration / 1000}s;
        animation-timing-function: ${animation.ease ? 'ease' : 'linear'};
        animation-delay: ${animation.delay / 1000}s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-play-state: running;
    `;
};

const computeGraphicStyles = (graphic, graphicIndex, project) => {
    return {
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
    };
};

const Preview = () => {
    const [config, setConfig] = useState(null);
    const [project, setProject] = useState(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [{ data: fonts }] = useFetch('/api/fonts');

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

    useEffect(() => {
        if (!fontsLoaded && config && fonts) {
            loadFonts(config, fonts);
            setFontsLoaded(true);
        }
    }, [fonts, config, fontsLoaded]);

    if (!config || !fontsLoaded) return null;

    return (
        <>
            {config.map((graphic, graphicIndex) => (
                <div key={graphic.id} style={computeGraphicStyles(graphic, graphicIndex, project)} css={computeAnimation(graphic, graphic.visible)}>
                    {graphic.texts?.map((text, index) => (
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
                            {text.content}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default Preview;
