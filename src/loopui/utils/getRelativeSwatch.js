import { SPOT_COLORS } from 'loopui/_tokens';
import getSwatchInfo from 'loopui/utils/getSwatchInfo';

const getRelativeSwatch = (swatchName, delta) => {
    const actualSwatchName = SPOT_COLORS[swatchName] || swatchName;
    const { colorName, lightness } = getSwatchInfo(actualSwatchName);
    const newLightness = Math.max(
        0,
        Math.min(700, Number(lightness || 400) + delta)
    );

    return `${colorName}--${newLightness}`;
};

export default getRelativeSwatch;
