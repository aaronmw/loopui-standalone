import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import Box from 'loopui/Box';
import { COLOR_NAMES, GRID_SIZES } from 'loopui/_tokens';
import buildPropTypes from 'loopui/utils/buildPropTypes';
import getColorByName from 'loopui/utils/getColorByName';
import getRelativeSwatch from 'loopui/utils/getRelativeSwatch';
import setSwatchLightness from 'loopui/utils/setSwatchLightness';

const BORDER_WIDTH = '2px';

const pendingAnimation = keyframes`
    from {
        left: -100px;
    }
    to {
        left: calc(100% + 100px);
    }
`;

const pendingStyles = css`
    opacity: 0.6;
    pointer-events: none;
    position: relative;

    &:before {
        animation-duration: 0.75s;
        animation-iteration-count: infinite;
        animation-name: ${pendingAnimation};
        animation-timing-function: linear;
        background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            white 50%,
            rgba(255, 255, 255, 0) 100%
        );
        bottom: -50px;
        content: '';
        position: absolute;
        top: -50px;
        transform: rotate(45deg);
        width: 50px;
    }
`;

const primaryButtonStyles = color => `
    &:focus,
    &:hover {
        background-color: ${getColorByName(getRelativeSwatch(color, -100))};
    }
    &:active {
        background-color: ${getColorByName(getRelativeSwatch(color, 100))};
    }
`;

const secondaryButtonStyles = color => `
    background-color: ${getColorByName(setSwatchLightness(color, 100))};
    border-color: ${getColorByName(setSwatchLightness(color, 400))};
    color: ${getColorByName(setSwatchLightness(color, 600))};

    &:focus,
    &:hover {
        border-color: ${getColorByName(setSwatchLightness(color, 200))};
    }
    &:active {
        background-color: ${getColorByName(setSwatchLightness(color, 200))};
    }
`;

const normalButtonStyles = color => `
    background-color: ${getColorByName(setSwatchLightness(color, 100))};
    color: ${getColorByName(setSwatchLightness(color, 600))};

    &:focus,
    &:hover {
        border-color: ${getColorByName(setSwatchLightness(color, 400))};
    }
    &:active {
        background-color: ${getColorByName(setSwatchLightness(color, 200))};
    }
`;

const Container = styled(Box)(
    ({ backgroundColor, isPending, priority }) => css`
        border-color: transparent;
        border-style: solid;
        border-width: ${BORDER_WIDTH};
        padding-top: ${GRID_SIZES.xtight};
        padding-bottom: ${GRID_SIZES.xtight};
        transition: all 0.125s;

        &:hover {
            transform: perspective(20px) translateZ(1px);
        }
        &:active {
            transform: perspective(20px) translateZ(-1px);
        }

        ${priority === 'primary'
            ? primaryButtonStyles(backgroundColor)
            : priority === 'secondary'
            ? secondaryButtonStyles(backgroundColor)
            : normalButtonStyles(backgroundColor)}

        ${isPending ? pendingStyles : ''}
    `
);

const Button = ({ children, color, ...otherProps }) => {
    return (
        <Container
            backgroundColor={setSwatchLightness(color, 500)}
            borderRadius
            forwardedAs="button"
            paddingX="normal"
            {...otherProps}
        >
            {children}
        </Container>
    );
};

buildPropTypes(Button, {
    color: {
        type: PropTypes.oneOf(COLOR_NAMES),
        defaultValue: 'purple',
    },
    disabled: {
        type: PropTypes.bool,
        defaultValue: null,
    },
    isPending: {
        type: PropTypes.bool,
        defaultValue: null,
    },
    priority: {
        type: PropTypes.oneOf(['primary', 'secondary', 'normal']),
        defaultValue: 'normal',
    },
});

export default Button;
