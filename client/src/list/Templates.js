import { v4 as uuidv4 } from 'uuid';

const Base = () => ({
    id: uuidv4(),
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: true,
    image: null,
    imageStretch: 'fill',
    animationIn: {
        style: 'Fade',
        addFade: false,
        duration: 500,
        delay: 0,
        ease: false
    },
    animationOut: {
        style: 'Fade',
        addFade: false,
        duration: 500,
        delay: 0,
        ease: false
    },
    texts: [],
    children: []
});

const BaseText = () => ({
    content: 'Example',
    left: 0,
    top: 0,
    width: 600,
    lineHeight: 0,
    rich: false,
    fontFamily: 'Roboto',
    fontSize: 60,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontColor: '#ffffff',
    textAlign: 'left'
});

export const SINGLE_TEXT = () => ({
    ...Base(),
    name: 'Single Text',
    type: 'SINGLE_TEXT',
    left: 0,
    top: 900,
    width: 600,
    height: 150,
    texts: [
        {
            ...BaseText(),
            left: 50,
            top: 15,
            width: 600
        }
    ]
});

export const DOUBLE_TEXT = () => ({
    ...Base(),
    name: 'Double Text',
    type: 'DOUBLE_TEXT',
    left: 0,
    top: 900,
    width: 700,
    height: 150,
    texts: [
        {
            ...BaseText(),
            left: 50,
            top: 15,
            width: 600,
        },
        {
            ...BaseText(),
            left: 50,
            top: 75,
            width: 600
        }
    ]
});

export const IMAGE = () => ({
    ...Base(),
    name: 'Image',
    type: 'IMAGE',
    width: 1280,
    height: 720
});
