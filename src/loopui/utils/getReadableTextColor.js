import { meetsContrastGuidelines } from 'polished';
import { COLOR_PALETTE, SPOT_COLORS } from 'loopui/_tokens';

const getWCAGContrastLevel = (colorA, colorB) => {
    const scorecard = meetsContrastGuidelines(colorA, colorB);
    return scorecard.AAA ? 'AAA' : scorecard.AA ? 'AA' : '< AA';
};

const getReadableTextColor = (backgroundColorCode = '#FFFFFF') => {
    const textColors = {
        light: {
            colorCode: '#FFFFFF',
            contrastScore: null,
        },
        dark: {
            colorCode: COLOR_PALETTE[SPOT_COLORS.text],
            contrastScore: null,
        },
    };

    Object.keys(textColors).forEach(textColor => {
        const textColorObject = textColors[textColor];
        const { colorCode } = textColorObject;
        textColorObject.contrastScore = getWCAGContrastLevel(
            colorCode,
            backgroundColorCode
        );
    });

    const readableTextColor =
        textColors.dark.contrastScore === 'AAA' ? 'dark' : 'light';

    const { colorCode, contrastScore } = textColors[readableTextColor];

    return { colorCode, contrastScore };
};

export default getReadableTextColor;
