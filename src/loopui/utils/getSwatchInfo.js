import { COLOR_PALETTE } from 'loopui/_tokens';

const getSwatchInfo = swatchName => {
    const hasLightness = swatchName.indexOf('--');
    const [colorName, lightness] = hasLightness
        ? swatchName.split('--')
        : [swatchName, 400];

    if (!COLOR_PALETTE[swatchName]) {
        throw new Error(`Invalid swatch name supplied: ${swatchName}`);
    }

    return { colorName, lightness };
};

export default getSwatchInfo;
