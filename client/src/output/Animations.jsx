/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes } from '@emotion/react';

export const FadeIn = (graphic) => keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1
    }
`;

export const FadeOut = (graphic) => keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;

export const SlideTopIn = (graphic) => keyframes`
    from {
        top: ${-graphic.height}px;
    }

    to {
        top: ${graphic.top}px;
    }
`;

export const SlideTopOut = (graphic) => keyframes`
    from {
        top: ${graphic.top}px;
    }

    to {
        top: ${-graphic.height}px;
    }
`;

export const SlideBottomIn = (graphic) => keyframes`
    from {
        top: ${window.innerHeight}px;
    }

    to {
        top: ${graphic.top}px;
    }
`;

export const SlideBottomOut = (graphic) => keyframes`
    from {
        top: ${graphic.top}px;
    }

    to {
        top: ${window.innerHeight}px;
    }
`;

export const SlideLeftIn = (graphic) => keyframes`
    from {
        left: ${-graphic.width}px;
    }

    to {
        left: ${graphic.left};
    }
`;

export const SlideLeftOut = (graphic) => keyframes`
    from {
        left: ${graphic.left}px;
    }

    to {
        left: ${-graphic.width}px;
    }
`;

export const SlideRightIn = (graphic) => keyframes`
    from {
        left: ${window.innerWidth}px;
    }

    to {
        left: ${graphic.left}px;
    }
`;

export const SlideRightOut = (graphic) => keyframes`
    from {
        left: ${graphic.left}px;
    }

    to {
        left: ${window.innerWidth}px;
    }
`;

export const WipeTopIn = (graphic) => keyframes`
    from {
        height: 0;
    }

    to {
        height: ${graphic.height}px;
    }
`;

export const WipeTopOut = (graphic) => keyframes`
    from {
        height: ${graphic.height}px;
    }

    to {
        height: 0;
    }
`;

export const WipeLeftIn = (graphic) => keyframes`
    from {
        width: 0;
    }

    to {
        width: ${graphic.width}px;
    }
`;

export const WipeLeftOut = (graphic) => keyframes`
    from {
        width: ${graphic.width}px;
    }

    to {
        width: 0;
    }
`;

export const ExpandYIn = (graphic) => keyframes`
    from {
        transform: scaleY(0);
    }

    to {
        transform: scaleY(1);
    }
`;

export const ExpandYOut = (graphic) => keyframes`
    from {
        transform: scaleY(1);
    }

    to {
        transform: scaleY(0);
    }
`;

export const ExpandXIn = (graphic) => keyframes`
    from {
        transform: scaleX(0);
    }

    to {
        transform: scaleX(1);
    }
`;

export const ExpandXOut = (graphic) => keyframes`
    from {
        transform: scaleX(1);
    }

    to {
        transform: scaleX(0);
    }
`;
