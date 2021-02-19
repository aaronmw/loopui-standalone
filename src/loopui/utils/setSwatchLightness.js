import getSwatchInfo from 'loopui/utils/getSwatchInfo';

const setSwatchLightness = (swatchName, newLightness) => {
    const { colorName } = getSwatchInfo(swatchName);
    return `${colorName}--${newLightness}`;
};

export default setSwatchLightness;
