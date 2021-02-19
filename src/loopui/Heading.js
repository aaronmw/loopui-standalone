import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'loopui/Box';
import buildPropTypes from 'loopui/utils/buildPropTypes';
import {
    BORDER_STYLES,
    COLOR_PALETTE,
    FONT_SIZES,
    HEADING_SIZE_TO_TAG_MAP,
    SPOT_COLORS,
} from './_tokens';

const stickyStyles = borderColor => `
    position: sticky;
    top: -1px;
    z-index: 1;

    &[stuck] {
        border-bottom:
            ${BORDER_STYLES['normal']}
            ${COLOR_PALETTE[borderColor || SPOT_COLORS.border]};
    }
`;

const Container = styled(Box)(({ borderColor, isSticky }) =>
    isSticky ? stickyStyles(borderColor) : ``
);

const Heading = ({ children, isSticky, size, ...otherProps }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!isSticky) {
            return;
        }

        const elementRef = ref.current;

        if (elementRef) {
            // https://stackoverflow.com/a/56678169/3273518
            const observer = new IntersectionObserver(
                ([e]) =>
                    e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
                { threshold: [1] }
            );

            observer.observe(elementRef);

            return () => {
                observer.unobserve(elementRef);
            };
        }
    }, [ref]);

    return (
        <Container
            forwardedAs={HEADING_SIZE_TO_TAG_MAP[size]}
            fontSize={size}
            fontWeight="bold"
            isSticky={isSticky}
            ref={ref}
            {...otherProps}
        >
            {children}
        </Container>
    );
};

buildPropTypes(Heading, {
    children: { type: PropTypes.node.isRequired },
    size: { type: PropTypes.oneOf(Object.keys(FONT_SIZES)).isRequired },
});

export default Heading;
