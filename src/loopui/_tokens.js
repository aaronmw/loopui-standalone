import { setLightness, parseToHsl } from 'polished';

const GRID_UNIT_BASE = '16px';
const GRID_SIZES = {
    xtight: `calc(${GRID_UNIT_BASE} * 0.25)`,
    tight: `calc(${GRID_UNIT_BASE} * 0.5)`,
    normal: GRID_UNIT_BASE,
    loose: `calc(${GRID_UNIT_BASE} * 1.5)`,
    xloose: `calc(${GRID_UNIT_BASE} * 2)`,
};

const FONT_SIZES = {
    small: `0.8rem`,
    normal: '14px',
    large: '1.5rem',
    xlarge: '2rem',
};

const LINE_HEIGHT_BASE = '20px';
const LINE_HEIGHTS = {
    small: `calc(${LINE_HEIGHT_BASE} * 0.8)`,
    normal: LINE_HEIGHT_BASE,
    large: `calc(${LINE_HEIGHT_BASE} * 1.25)`,
    'x-large': `calc(${LINE_HEIGHT_BASE} * 1.75)`,
};

const FONT_WEIGHTS = {
    bold: 900,
    normal: 400,
    light: 100,
};

const HEADING_SIZE_TO_TAG_MAP = {
    xlarge: 'h1',
    large: 'h2',
    normal: 'h3',
    small: 'h4',
};

const COLOR_PALETTE = {
    teal: '#56bfb8',
    purple: '#3E348A',
    blue: '#2d89df',
    yellow: '#f4b140',
    red: '#e94f60',
    gray: '#8E8BA1',
};

const COLOR_NAMES = Object.keys(COLOR_PALETTE);

// Generate tints
const COLOR_LIGHTNESS_NAMES = {
    light: [300, 200, 100],
    dark: [500, 600, 700],
};
const NUM_COLOR_STEPS = 3;
const LIGHTEST = 0.95;
const DARKEST = 0.1;

COLOR_NAMES.forEach(colorName => {
    const baseColorValue = COLOR_PALETTE[colorName];
    const baseLightness = parseToHsl(baseColorValue).lightness;
    const tintStepValue = (LIGHTEST - baseLightness) / NUM_COLOR_STEPS;
    const shadeStepValue = (baseLightness - DARKEST) / NUM_COLOR_STEPS;

    COLOR_PALETTE[`${colorName}--400`] = baseColorValue;

    COLOR_LIGHTNESS_NAMES.light.forEach((colorNameSuffix, index) => {
        COLOR_PALETTE[`${colorName}--${colorNameSuffix}`] = setLightness(
            baseLightness + (index + 1) * tintStepValue,
            baseColorValue
        );
    });

    COLOR_LIGHTNESS_NAMES.dark.forEach((colorNameSuffix, index) => {
        COLOR_PALETTE[`${colorName}--${colorNameSuffix}`] = setLightness(
            baseLightness - (index + 1) * shadeStepValue,
            baseColorValue
        );
    });
});

// Spot colors are just aliases to colors from the palette
const SPOT_COLORS = {
    border: 'gray--200',
    focusRing: 'teal--300',
    link: 'blue--500',
    selected: 'blue--100',
    text: 'purple--700',
    textFaded: 'gray--500',
};

const BORDER_RADII = {
    none: '0',
    normal: '4px',
    large: '8px',
};

const BORDER_STYLES = {
    normal: '1px solid',
    thick: '2px solid',
    dashed: '2px dashed',
};

const BOX_SHADOW_STYLES = {
    normal: `0 4px 5px ${COLOR_PALETTE['gray']}`,
    large: `0 8px 10px ${COLOR_PALETTE['gray']}`,
};

export {
    BORDER_RADII,
    BORDER_STYLES,
    BOX_SHADOW_STYLES,
    COLOR_LIGHTNESS_NAMES,
    COLOR_NAMES,
    COLOR_PALETTE,
    FONT_SIZES,
    FONT_WEIGHTS,
    GRID_SIZES,
    HEADING_SIZE_TO_TAG_MAP,
    LINE_HEIGHTS,
    SPOT_COLORS,
};
