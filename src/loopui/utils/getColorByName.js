import { COLOR_PALETTE, SPOT_COLORS } from 'loopui/_tokens';

const getColorByName = swatchNameOrColorCode =>
    COLOR_PALETTE[swatchNameOrColorCode] ||
    COLOR_PALETTE[SPOT_COLORS[swatchNameOrColorCode]] ||
    swatchNameOrColorCode;

export default getColorByName;
