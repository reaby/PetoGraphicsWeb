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
    video: null,
    countdown: null,
    playlist: null,
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

export const TRIPLE_TEXT = () => ({
    ...Base(),
    name: 'Triple Text',
    type: 'TRIPLE_TEXT',
    left: 0,
    top: 200,
    width: 700,
    height: 500,
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
        },
        {
            ...BaseText(),
            left: 50,
            top: 135,
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

export const CLOCK = () => ({
    ...Base(),
    name: 'Clock',
    type: 'CLOCK',
    left: 1600,
    top: 100,
    width: 200,
    height: 150,
    texts: [
        {
            ...BaseText(),
            left: 0,
            top: 43,
            width: 200,
            fontSize: 50,
            textAlign: 'center'
        },
    ]
});

export const COUNTDOWN = () => ({
    ...Base(),
    name: 'Countdown',
    type: 'COUNTDOWN',
    left: 0,
    top: 200,
    width: 700,
    height: 150,
    texts: [
        {
            ...BaseText(),
            content: '00:00:00',
            left: 50,
            top: 15,
            width: 600,
        },
    ],
    countdown: {
        type: 'remaining',
        time: '00:05:00',
        format: 'hh:mm:ss'
    }
});

export const VIDEO = () => ({
    ...Base(),
    name: 'Video',
    type: 'VIDEO',
    width: 1280,
    height: 720,
    video: {
        source: null,
        duration: 0,
        loop: false
    }
});

export const PLAYLIST = () => ({
    ...Base(),
    name: 'Playlist',
    type: 'PLAYLIST',
    width: 1280,
    height: 720,
    playlist: {
        sources: [],
        duration: 0,
        loop: false
    }
});
