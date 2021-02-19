import { COLOR_PALETTE, SPOT_COLORS } from 'loopui/_tokens';

const getSwatchInfo = swatchName => {
    const baseSwatchName = COLOR_PALETTE[swatchName]
        ? swatchName
        : COLOR_PALETTE[SPOT_COLORS[swatchName]]
        ? SPOT_COLORS[swatchName]
        : null;

    if (baseSwatchName === null) {
        throw new Error(`Invalid swatch name supplied: ${swatchName}`);
    }

    const hasLightness = baseSwatchName.indexOf('--');

    const [colorName, lightness] = hasLightness
        ? baseSwatchName.split('--')
        : [baseSwatchName, 400];

    return { colorName, lightness };
};

const getColor = (swatchName, adjustments = {}) => {
    const { colorName, lightness } = getSwatchInfo(swatchName);

    const targetLightness = adjustments.absolute
        ? adjustments.absolute
        : adjustments.relative
        ? Math.max(
              0,
              Math.min(700, Number(lightness || 400) + adjustments.relative)
          )
        : lightness;

    return COLOR_PALETTE[`${colorName}--${targetLightness}`];
};

export default getColor;
