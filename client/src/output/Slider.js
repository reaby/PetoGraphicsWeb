import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const SliderImage = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 100%;
    max-height: 100%;
    transform: translate(-50%, -50%);
    transition: opacity 1s;
    opacity: ${(props) => props.visible ? '1' : '0'};
`;

const Slider = ({ graphic, project }) => {
    const [sliderImage1Source, setSliderImage1Source] = useState(null);
    const [sliderImage2Source, setSliderImage2Source] = useState(null);
    const [sliderImage1Visible, setSliderImage1Visible] = useState(false);
    const [sliderImage2Visible, setSliderImage2Visible] = useState(false);

    useEffect(() => {
        let sliderInterval;
        if (graphic.slider) {
            let sliderIndex = 1;
            setSliderImage1Visible(true);
            setSliderImage2Visible(false);
            setSliderImage1Source(`/configs/${project}/${graphic.slider.sources[0]}`);
            setSliderImage2Source(`/configs/${project}/${graphic.slider.sources[1]}`);
            sliderInterval = setInterval(() => {
                sliderIndex++;
                if (sliderIndex > graphic.slider.sources.length - 1) {
                    sliderIndex = 0;
                }
                if (sliderIndex % 2 === 0) {
                    setSliderImage1Visible(true);
                    setSliderImage2Visible(false);
                    setTimeout(() => {
                        setSliderImage2Source(`/configs/${project}/${graphic.slider.sources[sliderIndex]}`);
                    }, 1000);
                } else {
                    setSliderImage1Visible(false);
                    setSliderImage2Visible(true);
                    setTimeout(() => {
                        setSliderImage1Source(`/configs/${project}/${graphic.slider.sources[sliderIndex]}`);
                    }, 1000);
                }
            }, graphic.slider.duration * 1000);
        }
        return () => clearInterval(sliderInterval);
        // eslint-disable-next-line
    }, [graphic.slider?.duration]);
    return (
        <>
            <SliderImage alt='slider-source' visible={sliderImage1Visible} src={sliderImage1Source} />
            <SliderImage alt='slider-source' visible={sliderImage2Visible} src={sliderImage2Source} />
        </>
    );
};

Slider.propTypes = {
    graphic: PropTypes.object.isRequired,
    project: PropTypes.string.isRequired
};

export default Slider;
