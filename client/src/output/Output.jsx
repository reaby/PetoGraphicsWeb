import { useState, useEffect } from 'react';
import { Global, css } from '@emotion/react';
import Graphic from './Graphic';
import useFonts from 'common/hooks/useFonts';
import useProject from 'common/hooks/useProject';
import PropTypes from 'prop-types';

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
            if (!fontMap.has(`${text.fontFamily}*${variant}`)) {
                const filepath = fonts
                    .find((font) => font.family === text.fontFamily && font.files[variant] != null)
                    ?.files[variant].replace('C:\\', '')
                    .replace(/\\/g, '/');
                if (filepath) {
                    fontMap.set(`${text.fontFamily}*${variant}`, {
                        family: text.fontFamily,
                        variant: variant,
                        style: text.fontStyle,
                        weight: text.fontWeight,
                        filepath: filepath,
                    });
                }
            }
        }
        fontMap = new Map([...fontMap, ...getConfigFonts(graphic.children, fonts)]);
    }
    return fontMap;
};

const loadFonts = (config, fonts) => {
    const configFonts = Array.from(getConfigFonts(config, fonts), ([, value]) => value);
    for (const font of configFonts) {
        const fontFace = new FontFace(font.family, `url(/static/${escape(font.filepath)})`, {
            style: font.style,
            weight: font.weight,
        });
        document.fonts.add(fontFace);
        fontFace.load().catch(console.error);
    }
};
const getStyles = (mode) => {
    let style = `
        body {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }

    `;

    if (mode) {
        style += `
        #root .graphic {
           outline: 1px dotted red;
        }        
        `;
    }

    return css(style);
};

const Output = ({ mode }) => {
    const { config, name, updateGraphic } = useProject();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const { fonts } = useFonts();

    useEffect(() => {
        if (!fontsLoaded && config && fonts) {
            loadFonts(config, fonts);
            setFontsLoaded(true);
        }
    }, [fonts, config, fontsLoaded]);

    if (!config || !fontsLoaded) return null;

    return (
        <>
            <Global styles={getStyles(mode)} />
            {config.map((graphic, graphicIndex) => (
                <Graphic
                    key={graphic.id}
                    graphic={graphic}
                    graphicIndex={graphicIndex}
                    project={name}
                    updateGraphic={updateGraphic}
                />
            ))}
        </>
    );
};

Output.propTypes = {
    mode: PropTypes.string,
};

export default Output;
