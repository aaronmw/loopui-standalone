import {
    BORDER_STYLES,
    COLOR_PALETTE,
    GRID_SIZES,
    SPOT_COLORS,
} from 'loopui/_tokens';
import { getStylesFromProps } from 'loopui/Box';

const testSpecs = {
    'Applies the chosen border style to all edges': {
        given: {
            border: 'dashed',
        },
        expect: [
            `border-left: ${BORDER_STYLES.dashed} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
            `border-right: ${BORDER_STYLES.dashed} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
            `border-top: ${BORDER_STYLES.dashed} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
            `border-bottom: ${BORDER_STYLES.dashed} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
        ],
    },
    'Applies the chosen borders given a mix of edge names and aliases': {
        given: {
            borderX: 'dashed',
            borderTop: true,
        },
        expect: [
            `border-left: ${BORDER_STYLES.dashed} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
            `border-right: ${BORDER_STYLES.dashed} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
            `border-top: ${BORDER_STYLES.normal} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
        ],
    },
    'Adds border to specified edge': {
        given: {
            borderBottom: 'dashed',
        },
        expect: [
            `border-bottom: ${BORDER_STYLES.dashed} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
        ],
    },
    'Infers default border style for an edge': {
        given: {
            borderBottom: true,
        },
        expect: [
            `border-bottom: ${BORDER_STYLES.normal} ${
                COLOR_PALETTE[SPOT_COLORS.border]
            };`,
        ],
    },
    'Infers default padding if nothing specified': {
        given: {
            padding: true,
        },
        expect: [
            `padding-left: ${GRID_SIZES.normal};`,
            `padding-right: ${GRID_SIZES.normal};`,
            `padding-top: ${GRID_SIZES.normal};`,
            `padding-bottom: ${GRID_SIZES.normal};`,
        ],
    },
    'Favours "padding" over "paddingX"': {
        given: {
            padding: 'loose',
            paddingX: 'normal',
        },
        expect: [
            `padding-left: ${GRID_SIZES.normal};`,
            `padding-right: ${GRID_SIZES.normal};`,
            `padding-top: ${GRID_SIZES.loose};`,
            `padding-bottom: ${GRID_SIZES.loose};`,
        ],
    },
    '"paddingLeft" overrides "paddingX"': {
        given: {
            paddingLeft: 'tight',
            paddingX: 'loose',
        },
        expect: [
            `padding-left: ${GRID_SIZES.tight};`,
            `padding-right: ${GRID_SIZES.loose};`,
        ],
    },
    'Respects both "paddingX" and "paddingY"': {
        given: {
            paddingX: 'loose',
            paddingY: 'tight',
        },
        expect: [
            `padding-left: ${GRID_SIZES.loose};`,
            `padding-right: ${GRID_SIZES.loose};`,
            `padding-top: ${GRID_SIZES.tight};`,
            `padding-bottom: ${GRID_SIZES.tight};`,
        ],
    },
    'Respects both "paddingX" and "paddingTop"': {
        given: {
            paddingX: 'loose',
            paddingTop: 'tight',
        },
        expect: [
            `padding-left: ${GRID_SIZES.loose};`,
            `padding-right: ${GRID_SIZES.loose};`,
            `padding-top: ${GRID_SIZES.tight};`,
        ],
    },
    'Successfully merges three props of varying specifity': {
        given: {
            padding: 'loose',
            paddingLeft: 'xtight',
            paddingX: 'normal',
        },
        expect: [
            `padding-left: ${GRID_SIZES.xtight};`,
            `padding-right: ${GRID_SIZES.normal};`,
            `padding-top: ${GRID_SIZES.loose};`,
            `padding-bottom: ${GRID_SIZES.loose};`,
        ],
    },
    'Applies border color': {
        given: {
            border: true,
            borderColor: 'purple',
        },
        expect: [
            `border-left: ${BORDER_STYLES.normal} ${COLOR_PALETTE['purple']};`,
            `border-right: ${BORDER_STYLES.normal} ${COLOR_PALETTE['purple']};`,
            `border-top: ${BORDER_STYLES.normal} ${COLOR_PALETTE['purple']};`,
            `border-bottom: ${BORDER_STYLES.normal} ${COLOR_PALETTE['purple']};`,
        ],
    },
};

Object.keys(testSpecs).forEach(testName => {
    const testSpec = testSpecs[testName];

    it(testName, () => {
        const edgeStyles = getStylesFromProps(testSpec.given);
        expect(edgeStyles).toEqual(expect.arrayContaining(testSpec.expect));
    });
});
